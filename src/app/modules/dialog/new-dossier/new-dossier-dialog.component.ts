import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { DossierService } from 'src/app/services/dossier.service';
import {
  DOSSIER_STATUSES,
  DOSSIER_STATUS_APPROVALS,
} from 'src/app/shared/constants';
import { Dossier } from 'src/app/types/dossier';

@Component({
  templateUrl: './new-dossier-dialog.component.html',
})
export class NewDossierDialogComponent {
  private _httpRequest$: Subscription | undefined;

  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly dossierService: DossierService,
    private readonly dialogRef: MatDialogRef<NewDossierDialogComponent>
  ) {
    this.form = fb.group({
      entryDate: [new Date().toISOString(), Validators.required],
      receivedDate: [null, Validators.required],
      requestNumber: [null, Validators.required],
      transactionReference: ['', Validators.required],
      amountInGrantCurrency: [null, Validators.required],
      amountInLocalCurrency: [null, Validators.required],
      description: ['', Validators.required],
      status: [1, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  get DOSSIER_STATUS_APPROVALS() {
    return DOSSIER_STATUS_APPROVALS;
  }

  get DOSSIER_STATUSES() {
    return DOSSIER_STATUSES;
  }

  onAdd() {
    if (this.form.invalid) return;

    const dossier = this.form.value as Dossier;
    this.loading = true;

    this.dossierService.addDossier(dossier).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }

  onCancel() {
    if (this._httpRequest$ && !this._httpRequest$.closed)
      this._httpRequest$.unsubscribe();

    this.dialogRef.close();
  }
}
