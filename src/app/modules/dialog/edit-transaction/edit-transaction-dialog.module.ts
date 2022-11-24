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

import { EditTransactionDialogComponent } from './edit-transaction-dialog.component';

@NgModule({
  declarations: [EditTransactionDialogComponent],
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
export class EditTransactionDialogModule {
  static getComponent() {
    return EditTransactionDialogComponent;
  }
}
