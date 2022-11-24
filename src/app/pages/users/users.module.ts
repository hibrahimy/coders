import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UsersPageRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './users.component';

@NgModule({
  declarations: [UsersPageComponent],
  imports: [
    UsersPageRoutingModule,
    // Materials
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class UsersPageModule {}
