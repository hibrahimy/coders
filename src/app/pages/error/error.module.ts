import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { ErrorPageRoutingModule } from './error-routing.module';
import { NotFoundPageComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    ErrorPageRoutingModule,
    // Materials
    MatButtonModule,
  ],
  declarations: [NotFoundPageComponent],
})
export class ErrorPageModule {}
