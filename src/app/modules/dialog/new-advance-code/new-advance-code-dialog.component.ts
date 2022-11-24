import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { SubsCollector } from './../../../shared/subs-collector';
import { AdvanceCode } from '../../../types/advance-code';
import { AdvanceCodeService } from '../../../services/advance-code.service';

@Component({
  templateUrl: './new-advance-code-dialog.component.html',
})
export class NewAdvanceCodeDialogComponent extends SubsCollector {
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly advanceCodeService: AdvanceCodeService,
    private readonly dialogRef: MatDialogRef<NewAdvanceCodeDialogComponent>
  ) {
    super();

    this.form = fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onAdd() {
    if (this.form.invalid) return;

    const advanceCode = this.form.value as AdvanceCode;

    this.loading = true;
    this.subs = this.advanceCodeService.addAdvanceCode(advanceCode).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
    });
  }
}
