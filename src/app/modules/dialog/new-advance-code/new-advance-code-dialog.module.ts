import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { NewAdvanceCodeDialogComponent } from './new-advance-code-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ NewAdvanceCodeDialogComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Materials
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class NewAdvanceCodeDialogModule {
  static getComponent() {
    return NewAdvanceCodeDialogComponent;
  }
}
