import { transition, trigger, useAnimation } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { delay, tap } from 'rxjs';

import { CustomDataSource } from 'src/app/shared/data-source';
import {
  Dossier,
  DossierStatusApprovalEnum,
  DossierStatusEnum,
} from 'src/app/types/dossier';
import { DossierService } from 'src/app/services/dossier.service';
import { fadeInOutAni, getFadeInOutParams } from 'src/app/shared/animations';
import { SubsCollector } from 'src/app/shared/subs-collector';
import { DialogProps } from 'src/app/types/dialog';
import { LayoutService } from 'src/app/modules/layout/layout.service';
import { ANIMATION } from 'src/app/shared/constants';

@Component({
  templateUrl: './dossier.component.html',
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
export class DossierPageComponent
  extends SubsCollector
  implements OnInit, AfterViewInit
{
  loading = true;
  errorMessage = '';
  hoveringIndex = -1;
  openingMenuIndex = -1;
  tableMaxWidth = 0;

  // Table
  filterControl = new FormControl('');
  dataSource: CustomDataSource<Dossier>;
  isDisplayAllColumns = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('card') cardContent: ElementRef | null = null;

  constructor(
    private readonly dossierService: DossierService,
    private readonly dialog: MatDialog,
    private readonly layoutService: LayoutService
  ) {
    super();

    this.dataSource = new CustomDataSource(
      this.dossierService.dossiers$,
      this.filterControl.valueChanges
    );
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  ngAfterViewInit(): void {
    this.subs = this.layoutService.sidebarExpanded$
      .pipe(
        tap(() => {
          if (this.isDisplayAllColumns) this.onToggleDisplay();
        }),
        delay(
          ANIMATION.SIDEBAR_EXPAND_TIME +
            ANIMATION.SIDEBAR_ITEM_EXPAND_TIME +
            100
        )
      )
      .subscribe(() => {
        if (this.cardContent && typeof window !== 'undefined') {
          const element = this.cardContent.nativeElement;
          const width = element.clientWidth;
          const styles = window.getComputedStyle(element);
          const padding =
            parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

          this.tableMaxWidth = width - padding;
        }
      });
  }

  get isFiltering() {
    return Boolean(this.filterControl.value);
  }

  get DossierStatusEnum() {
    return DossierStatusEnum;
  }

  get DossierStatusApprovalEnum() {
    return DossierStatusApprovalEnum;
  }

  get displayedColumns() {
    if (this.isDisplayAllColumns)
      return [
        'entryDate',
        'applicationNr',
        'sourceFunding',
        'status',
        'referenceTransaction',
        'total',
        'amountInLocalCurrency',
        'timestamp',
        'receivedDate',
        'description',
        'statusApproval',
        'statusApprovalReason',
        'statusApprovedDelay',
        'options',
      ];

    return [
      'entryDate',
      'applicationNr',
      'sourceFunding',
      'status',
      'referenceTransaction',
      'total',
      'options',
    ];
  }

  get toggleDisplayIcon() {
    return this.isDisplayAllColumns ? 'menu_open' : 'list';
  }

  onLoadData() {
    this.loading = true;
    this.errorMessage = '';

    this.dossierService
      .fetchDossiers()
      .pipe()
      .subscribe({
        next: () => {
          this.loading = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.message;
        },
      });
  }

  onMouseEnterRow(index: number) {
    if (this.openingMenuIndex === -1) this.hoveringIndex = index;
  }

  onMouseLeaveRow() {
    if (this.openingMenuIndex === -1) this.hoveringIndex = -1;
  }

  async onNewDossier() {
    const Component = await import(
      '../../modules/dialog/new-dossier/new-dossier-dialog.module'
    ).then((m) => m.NewDossierDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((isAdded) => {
        if (isAdded) this.onLoadData();
      });
  }

  async onEditDossier(dossier: Dossier) {
    const Component = await import(
      '../../modules/dialog/edit-dossier/edit-dossier-dialog.module'
    ).then((m) => m.EditDossierDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
        data: {
          dossierId: dossier.id,
        },
      })
      .afterClosed()
      .subscribe((isEdited) => {
        if (isEdited) this.onLoadData();
      });
  }

  async onDeleteDossier(dossier: Dossier) {
    const Component = await import('../../modules/dialog/dialog.module').then(
      (m) => m.DialogComponentModule.getComponent()
    );

    this.dialog
      .open<any, DialogProps>(Component, {
        data: {
          content: 'Dossier delete confirmation text',
          confirmObservable: () =>
            this.dossierService.deleteDossier(dossier.id),
        },
      })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) this.onLoadData();
      });
  }

  onMenuOpened(index: number) {
    this.openingMenuIndex = index;
  }

  onMenuClosed() {
    this.openingMenuIndex = -1;
  }

  onToggleDisplay() {
    this.isDisplayAllColumns = !this.isDisplayAllColumns;
  }
}
