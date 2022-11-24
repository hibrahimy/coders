import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { MatDialog } from '@angular/material/dialog';
import { transition, trigger, useAnimation } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { delay, tap } from 'rxjs';

import { DossierService } from 'src/app/services/dossier.service';
import { FooterService } from 'src/app/services/footer.service';
import { SubsCollector } from 'src/app/shared/subs-collector';
import { Dossier, DossierStatusApprovalEnum } from 'src/app/types/dossier';
import { DialogProps } from 'src/app/types/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { fadeInOutAni, getFadeInOutParams } from 'src/app/shared/animations';
import { CustomDataSource } from 'src/app/shared/data-source';
import { Transaction } from 'src/app/types/transaction';
import { LayoutService } from 'src/app/modules/layout/layout.service';
import { ANIMATION } from 'src/app/shared/constants';

@Component({
  templateUrl: './transactions.component.html',
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
export class TransactionsPageComponent
  extends SubsCollector
  implements AfterViewInit
{
  private _dossierId: string | undefined;
  private _dossier: Dossier | undefined;

  states = {
    fetchingTransactions: true,
    fetchingDossier: true,
  };
  errorMessage = '';
  hoveringIndex = -1;
  openingMenuIndex = -1;
  tableMaxWidth = 0;

  // Table
  filterControl = new FormControl('');
  dataSource: CustomDataSource<Transaction>;
  isDisplayAllColumns = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild('card') cardContent: ElementRef | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dossierService: DossierService,
    private readonly footerService: FooterService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly transactionService: TransactionService,
    private readonly layoutService: LayoutService
  ) {
    super();

    this.dataSource = new CustomDataSource(
      this.transactionService.transactions$,
      this.filterControl.valueChanges
    );

    this.subs = this.route.params.pipe().subscribe(({ dossierId }) => {
      this._dossierId = dossierId;

      this.onLoadDossier();
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.footerService.setShow(false);
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
      .subscribe(() => this.onCalcTableWidth());
  }

  get isFiltering() {
    return Boolean(this.filterControl.value);
  }

  get displayedColumns() {
    if (this.isDisplayAllColumns)
      return [
        'transactionDate',
        'transactionType',
        'paymentDate',
        'paymentMethod',
        'balanceInGrantCurrency',
        'balanceInLocalCurrency',
        'description',
        'pvDate',
        'budgetLine',
        'employeeCode',
        'advanceCode',
        'options',
      ];

    return [
      'transactionDate',
      'transactionType',
      'paymentDate',
      'paymentMethod',
      'balanceInGrantCurrency',
      'options',
    ];
  }

  get toggleDisplayIcon() {
    return this.isDisplayAllColumns ? 'menu_open' : 'list';
  }

  onLoadDossier() {
    if (!this._dossierId) return;

    this.states.fetchingDossier = true;
    this.footerService.setShow(false);

    this.subs = this.dossierService.fetchDossier(this._dossierId).subscribe({
      next: (dossier) => {
        this._dossier = dossier;
        this.states.fetchingDossier = false;
        this.onLoadTransactions();
      },
      error: () => {
        this.router.navigate(['/', 'error', '404']);
      },
    });
  }

  onLoadTransactions() {
    if (!this._dossierId) return;

    this.states.fetchingTransactions = true;

    this.subs = this.transactionService
      .fetchTransactions(this._dossierId)
      .subscribe({
        next: (transactions) => {
          this.states.fetchingTransactions = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.onLoadFooterData(transactions);
          this.onCalcTableWidth();
        },
        error: (error) => {
          this.states.fetchingTransactions = false;
          this.errorMessage = error.message;
        },
      });
  }

  onLoadFooterData(transactions: Transaction[]) {
    if (!this._dossier) return;

    const amount = transactions.reduce(
      (result, transaction) => (result += transaction.balanceInGrantCurrency),
      0
    );
    const balance = this._dossier.amountInGrantCurrency - amount;
    const balanceColor =
      balance === 0 ? 'black' : balance < 0 ? 'red' : 'green';
    this.footerService.setData({
      title: '',
      frontItems: [
        {
          label: 'Entry date',
          content: dayjs(this._dossier.entryDate).format('MMM DD, YYYY'),
        },
        {
          label: 'Application Number',
          content: this._dossier.requestNumber.toString(),
        },
        {
          label: 'Source of funding',
          content: '',
        },
        {
          label: 'Amount',
          content: amount.toString(),
          fontSize: 18,
        },
        {
          label: 'Balance',
          content: balance.toString(),
          fontSize: 18,
          color: balanceColor,
        },
      ],
      subItems: [
        {
          label: 'Date received',
          content: dayjs(this._dossier.receivedDate).format('MMM DD, YYYY'),
        },
        {
          label: 'Ref. Transaction',
          content: this._dossier.transactionReference,
        },
        {
          label: 'Description',
          content: this._dossier.description,
          maxWidth: 300,
        },
        {
          label: 'Amount XOF',
          content: this._dossier.amountInLocalCurrency.toString(),
        },
        {
          label: 'Status Approval',
          content: DossierStatusApprovalEnum[this._dossier.statusApproval],
        },
        {
          label: 'Last Update',
          content: dayjs(this._dossier.lastStatusUpdate).format('MMM DD, YYYY'),
        },
      ],
      onEdit: () => this.onEditDossier(),
      menuItems: [
        {
          label: 'Delete',
          onClick: () => this.onDeleteDossier(),
          color: '!text-red-500',
          icon: 'delete',
        },
      ],
    });
  }

  onCalcTableWidth() {
    if (this.cardContent && typeof window !== 'undefined') {
      const element = this.cardContent.nativeElement;
      const width = element.clientWidth;
      const styles = window.getComputedStyle(element);
      const padding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

      this.tableMaxWidth = width - padding;
    }
  }

  async onNewTransaction() {
    const Component = await import(
      '../../modules/dialog/new-transaction/new-transaction-dialog.module'
    ).then((m) => m.NewTransactionDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
        data: {
          dossierId: this._dossierId,
        },
      })
      .afterClosed()
      .subscribe((isAdded) => {
        if (isAdded) this.onLoadTransactions();
      });
  }

  async onEditDossier() {
    if (!this._dossierId) return;

    const Component = await import(
      '../../modules/dialog/edit-dossier/edit-dossier-dialog.module'
    ).then((m) => m.EditDossierDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
        data: {
          dossierId: this._dossierId,
        },
      })
      .afterClosed()
      .subscribe((isEdited) => {
        if (isEdited) this.onLoadDossier();
      });
  }

  async onDeleteDossier() {
    if (!this._dossierId) return;

    const Component = await import('../../modules/dialog/dialog.module').then(
      (m) => m.DialogComponentModule.getComponent()
    );

    this.dialog
      .open<any, DialogProps>(Component, {
        data: {
          content: 'Dossier delete confirmation text',
          confirmObservable: () =>
            this.dossierService.deleteDossier(this._dossierId!),
        },
      })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) this.onLoadDossier();
      });
  }

  async onDeleteTransaction(transaction: Transaction) {
    if (!this._dossierId) return;

    const Component = await import('../../modules/dialog/dialog.module').then(
      (m) => m.DialogComponentModule.getComponent()
    );

    this.dialog
      .open<any, DialogProps>(Component, {
        data: {
          content: 'Transaction delete confirmation text',
          confirmObservable: () =>
            this.transactionService.deleteTransaction(
              this._dossierId!,
              transaction.id
            ),
        },
      })
      .afterClosed()
      .subscribe((isDeleted) => {
        if (isDeleted) this.onLoadTransactions();
      });
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

  async onEditTransaction(transaction: Transaction) {
    if (!this._dossierId) return;

    const Component = await import(
      '../../modules/dialog/edit-transaction/edit-transaction-dialog.module'
    ).then((m) => m.EditTransactionDialogModule.getComponent());

    this.dialog
      .open(Component, {
        disableClose: true,
        data: {
          dossierId: this._dossierId,
          transactionId: transaction.id,
        },
      })
      .afterClosed()
      .subscribe((isEdited) => {
        if (isEdited) this.onLoadTransactions();
      });
  }

  onToggleDisplay() {
    this.isDisplayAllColumns = !this.isDisplayAllColumns;
  }
}
