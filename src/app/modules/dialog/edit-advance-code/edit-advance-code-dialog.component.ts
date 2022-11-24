import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { diff } from 'deep-diff';

import { SubsCollector } from 'src/app/shared/subs-collector';
import { AdvanceCodeService } from '../../../services/advance-code.service';
import { AdvanceCode } from '../../../types/advance-code';
import { getLhsFromObject } from 'src/app/shared/utils';

@Component({
  templateUrl: './edit-advance-code-dialog.component.html',
})
export class EditAdvanceCodeDialogComponent extends SubsCollector {
  advanceCode: AdvanceCode | undefined;
  form: FormGroup;
  errorMessage = '';
  states = {
    fetching: true,
    saving: false,
  };

  constructor(
    @Inject(DIALOG_DATA) private data: { id: string },
    private readonly fb: FormBuilder,
    private readonly advanceCodeService: AdvanceCodeService,
    private readonly dialogRef: MatDialogRef<EditAdvanceCodeDialogComponent>
  ) {
    super();

    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      code: [null, Validators.required],
      description: [null, Validators.required],
    });

    const { id } = data;
    if (id)
      this.subs = this.advanceCodeService.fetchAdvanceCode(id).subscribe({
        next: (advanceCode) => {
          this.advanceCode = advanceCode;
          this.states.fetching = false;
          this.form.patchValue({
            ...advanceCode,
          });
        },
        error: (error) => {
          this.states.fetching = false;
          this.errorMessage = error.message;
        },
      });
    else {
      this.states.fetching = false;
      this.errorMessage = 'Advance Code ID is not specified';
    }
  }

  get f() {
    return this.form.controls;
  }
  onSave() {
    if (this.form.invalid || !this.advanceCode) return;

    this.states.saving = true;

    const rhs = this.form.value as Partial<AdvanceCode>;
    const lhs = getLhsFromObject<AdvanceCode>(this.advanceCode, rhs);
    const deepDiff = diff(lhs, rhs);

    if (!deepDiff) return;

    this.advanceCodeService
      .updateAdvanceCode(this.advanceCode.id, deepDiff)
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (error) => {
          this.errorMessage = error.message;
          this.states.saving = false;
        },
      });
  }
}
