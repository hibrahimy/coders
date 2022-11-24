import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login.component';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
