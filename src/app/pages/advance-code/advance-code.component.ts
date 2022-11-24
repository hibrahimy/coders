import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CustomDataSource } from 'src/app/shared/data-source';
import { SubsCollector } from 'src/app/shared/subs-collector';
import { DialogProps } from 'src/app/types/dialog';
import { AdvanceCode } from './../../types/advance-code';
import { fadeInOutAni, getFadeInOutParams } from 'src/app/shared/animations';
import { AdvanceCodeService } from '../../services/advance-code.service';

@Component({
  templateUrl: './advance-code.component.html',
  animations: [
    trigger('optionsTrigger', [
      transition(':enter', [
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'in',
          }),
        }),
      ]),
      transition(':leave', [
        useAnimation(fadeInOutAni, {
          params: getFadeInOutParams({
            direction: 'out',
          }),
        }),
      ]),
    ]),
  ],
})
export class AdvancecodePageComponent
  extends SubsCollector
  implements AfterViewInit, OnInit
{
  loading = true;
  errorMessage = '';
  hoveringIndex = -1;
  openingMenuIndex = -1;

  displayedColumns: string[] = ['code', 'description', 'options'];

  filterControl = new FormControl('');
  dataSource: CustomDataSource<AdvanceCode>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private readonly dialog: MatDialog,
    private readonly advanceCodeService: AdvanceCodeService
  ) {
    super();

    this.dataSource = new CustomDataSource(
      this.advanceCodeService.advanceCodes$,
      this.filterControl.valueChanges
    );
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onLoadData() {
    this.loading = true;
    this.errorMessage = '';

    this.advanceCodeService
      .fetchAdvanceCodes()
      .pipe()
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message;
        },
      });
  }

  get isFiltering() {
    return Boolean(this.filterControl.value);
  }

  onMouseEnterRow(index: number) {
    if (this.openingMenuIndex === -1) this.hoveringIndex = index;
  }

  onMouseLeaveRow() {
    if (this.openingMenuIndex === -1) this.hoveringIndex = -1;
  }

  onMenuOpened(index: number) {
    this.openingMenuIndex = index;
  }

  onMenuClosed() {
    this.openingMenuIndex = -1;
  }

  async onNewAdvanceCode() {
    const Component = await import(
      '../../modules/dialog/new-advance-code/new-advance-code-dialog.module'
    ).then((m) => m.NewAdvanceCodeDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((isAdded) => {
        if (isAdded) this.onLoadData();
      });
  }

  async onEditAdvanceCode(advanceCode: AdvanceCode) {
    const Component = await import(
      '../../modules/dialog/edit-advance-code/edit-advance-code-dialog.module'
    ).then((m) => m.EditAdvanceCodeDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
        data: {
          id: advanceCode.id,
        },
      })
      .afterClosed()
      .subscribe((isEdited) => {
        if (isEdited) this.onLoadData();
      });
  }

  async onDeleteAdvanceCode(advanceCode: AdvanceCode) {
    const Component = await import('../../modules/dialog/dialog.module').then(
      (m) => m.DialogComponentModule.getComponent()
    );

    this.dialog
      .open<any, DialogProps>(Component, {
        data: {
          content: 'Advance Code delete confirmation text',
          confirmObservable: () =>
            this.advanceCodeService.deleteAdvanceCode(advanceCode.id),
        },
      })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) this.onLoadData();
      });
  }
}
