import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { TransactionsPageRoutingModule } from './transactions-routing.module';
import { TransactionsPageComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsPageRoutingModule,
    // Materials
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
})
export class TransactionsPageModule {}
