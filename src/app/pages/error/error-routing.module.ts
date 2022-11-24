import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './not-found/not-found.component';

const routes: Route[] = [
  {
    path: '404',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorPageRoutingModule {}
