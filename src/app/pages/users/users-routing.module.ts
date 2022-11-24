import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UsersPageComponent } from './users.component';

const routes: Route[] = [
  {
    path: '',
    component: UsersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
