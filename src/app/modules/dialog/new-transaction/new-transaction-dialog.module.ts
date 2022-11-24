import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { NewTransactionDialogComponent } from './new-transaction-dialog.component';

@NgModule({
  declarations: [NewTransactionDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class NewTransactionDialogModule {
  static getComponent() {
    return NewTransactionDialogComponent;
  }
}
