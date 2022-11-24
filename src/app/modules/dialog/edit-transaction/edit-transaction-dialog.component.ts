import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { diff } from 'deep-diff';

import { SubsCollector } from 'src/app/shared/subs-collector';
import { Transaction } from 'src/app/types/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { AdvanceCodeService } from 'src/app/services/advance-code.service';
import { getLhsFromObject } from 'src/app/shared/utils';

@Component({
  templateUrl: './edit-transaction-dialog.component.html',
})
export class EditTransactionDialogComponent
  extends SubsCollector
  implements OnInit
{
  transaction: Transaction | undefined;
  form: FormGroup;
  errorMessage = '';
  states = {
    fetching: true,
    saving: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      dossierId: string;
      transactionId: string;
    },
    private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly dialogRef: MatDialogRef<EditTransactionDialogComponent>,
    private readonly advanceCodeService: AdvanceCodeService
  ) {
    super();

    this.form = fb.group({
      transactionDate: ['', Validators.required],
      transactionType: [0, Validators.required],
      description: ['', Validators.required],
      pvDate: ['', Validators.required],
      balanceInGrantCurrency: [0, Validators.required],
      balanceInLocalCurrency: [0, Validators.required],
      budgetLine: [0, Validators.required],
      employeeCodeId: ['', Validators.required],
      advanceCodeId: ['', Validators.required],
      paymentMethod: [0, Validators.required],
      paymentDate: ['', Validators.required],
    });

    const { transactionId, dossierId } = data;

    if (dossierId && transactionId)
      this.subs = this.transactionService
        .fetchTransaction(dossierId, transactionId)
        .subscribe({
          next: (transaction) => {
            this.transaction = transaction;
            this.states.fetching = false;
            this.form.patchValue({
              ...transaction,
              employeeCodeId: transaction.employeeCode?.id,
              advanceCodeId: transaction.advanceCode?.id,
            });
          },
          error: (error) => {
            this.states.fetching = false;
            this.errorMessage = error.message;
          },
        });
  }

  ngOnInit(): void {
    this.subs = this.advanceCodeService.fetchAdvanceCodes().subscribe();
  }

  get f() {
    return this.form.controls;
  }

  get advanceCodes$() {
    return this.advanceCodeService.advanceCodes$;
  }

  onSave() {
    if (
      this.form.invalid ||
      !this.data?.dossierId ||
      !this.data?.transactionId ||
      !this.transaction
    )
      return;

    this.states.saving = true;
    const rhs = this.form.value as Partial<Transaction>;
    const lhs = getLhsFromObject<Transaction>(this.transaction, rhs);
    const deepDiff = diff(lhs, rhs);

    if (!deepDiff) return;

    this.subs = this.transactionService
      .updateTransaction(this.data.dossierId, this.transaction.id, deepDiff)
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => {
          this.errorMessage = error.message;
          this.states.saving = false;
        },
      });
  }
}
