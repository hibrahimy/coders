import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
