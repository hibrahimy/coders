import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Subscription } from 'rxjs';
import { diff } from 'deep-diff';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { DossierService } from 'src/app/services/dossier.service';
import { Dossier } from 'src/app/types/dossier';
import {
  DOSSIER_STATUSES,
  DOSSIER_STATUS_APPROVALS,
} from 'src/app/shared/constants';
import { getLhsFromObject } from 'src/app/shared/utils';

@Component({
  templateUrl: './edit-dossier-dialog.component.html',
})
export class EditDossierDialogComponent {
  private _httpRequest$: Subscription | undefined;

  dossier: Dossier | undefined;
  form: FormGroup;
  errorMessage = '';
  states = {
    fetching: true,
    saving: false,
  };

  constructor(
    @Inject(DIALOG_DATA) private data: { dossierId: string },
    private readonly fb: FormBuilder,
    private readonly dossierService: DossierService,
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<EditDossierDialogComponent>
  ) {
    this.form = fb.group({
      receivedDate: [null, Validators.required],
      requestNumber: [null, Validators.required],
      transactionReference: ['', Validators.required],
      amountInGrantCurrency: [null, Validators.required],
      amountInLocalCurrency: [null, Validators.required],
      description: ['', Validators.required],
      status: [1, Validators.required],
    });

    const { dossierId } = data;

    if (dossierId)
      this.dossierService.fetchDossier(dossierId).subscribe({
        next: (dossier) => {
          this.dossier = dossier;
          this.form.patchValue({
            ...dossier,
          });
          this.states.fetching = false;
        },
        error: (error) => {
          this.states.fetching = false;
          this.errorMessage = error.message;
        },
      });
    else {
      this.states.fetching = false;
      this.errorMessage = 'Dossier ID is not specified';
    }
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

  onSave() {
    if (this.form.invalid || !this.dossier) return;

    this.states.saving = true;
    const rhs = this.form.value as Partial<Dossier>;
    const lhs = getLhsFromObject<Dossier>(this.dossier, rhs);
    const deepDiff = diff(lhs, rhs);

    if (!deepDiff) return;

    this.dossierService.updateDossier(this.dossier.id, deepDiff).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => {
        this.errorMessage = error.message;
        this.states.saving = false;
      },
    });
  }

  onCancel() {
    if (this._httpRequest$ && !this._httpRequest$.closed)
      this._httpRequest$.unsubscribe();

    this.dialogRef.close();
  }
}
