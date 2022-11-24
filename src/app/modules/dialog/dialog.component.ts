import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { SubsCollector } from 'src/app/shared/subs-collector';
import { DialogProps } from 'src/app/types/dialog';

@Component({
  templateUrl: './dialog.component.html',
})
export class DialogComponent extends SubsCollector {
  private _subscription: Subscription | undefined;

  confirming = false;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogProps,
    private readonly dialogRef: MatDialogRef<DialogComponent>
  ) {
    super();

    this.subs = this.dialogRef.beforeClosed().subscribe(() => {
      if (this._subscription) this._subscription.unsubscribe();
    });
  }

  get title() {
    return this.data.title ?? 'Confirmation';
  }

  get content() {
    return this.data.content ?? '';
  }

  get confirmColor() {
    return this.data.confirmColor ?? 'primary';
  }

  get confirmLabel() {
    return this.data.confirmLabel ?? 'Confirm';
  }

  get cancelLabel() {
    return this.data.cancelLabel ?? 'Cancel';
  }

  onConfirm() {
    if (this.data.confirmObservable) {
      this.confirming = true;

      this.subs = this.data.confirmObservable().subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.confirming = false;
          this.errorMessage = this.data.errorMessage ?? error.message;
        },
      });
    } else this.dialogRef.close(true);
  }
}
