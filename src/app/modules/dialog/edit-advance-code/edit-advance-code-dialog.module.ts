import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { EditAdvanceCodeDialogComponent } from './edit-advance-code-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EditAdvanceCodeDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class EditAdvanceCodeDialogModule {
  static getComponent() {
    return EditAdvanceCodeDialogComponent;
  }
}
