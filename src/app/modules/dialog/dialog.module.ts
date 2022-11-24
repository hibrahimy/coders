import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [DialogComponent],
})
export class DialogComponentModule {
  static getComponent() {
    return DialogComponent;
  }
}
