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
import { MatDialogModule } from '@angular/material/dialog';

import { NewDossierDialogComponent } from './new-dossier-dialog.component';

@NgModule({
  declarations: [NewDossierDialogComponent],
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
    MatDialogModule
  ],
})
export class NewDossierDialogModule {
  static getComponent() {
    return NewDossierDialogComponent;
  }
}
