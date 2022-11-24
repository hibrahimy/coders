import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SubsCollector } from 'src/app/shared/subs-collector';
import { Transaction } from 'src/app/types/transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { AdvanceCodeService } from 'src/app/services/advance-code.service';

@Component({
  templateUrl: './new-transaction-dialog.component.html',
})
export class NewTransactionDialogComponent
  extends SubsCollector
  implements OnInit
{
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      dossierId: string;
    },
    private readonly fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly dialogRef: MatDialogRef<NewTransactionDialogComponent>,
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

  onAdd() {
    if (this.form.invalid || !this.data?.dossierId) return;

    const transaction = this.form.value as Transaction;
    this.loading = true;

    this.subs = this.transactionService
      .addTransaction(this.data.dossierId, transaction)
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => {
          this.errorMessage = error.message;
          this.loading = false;
        },
      });
  }
}
