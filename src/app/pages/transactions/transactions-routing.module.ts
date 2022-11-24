import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TransactionsPageComponent } from './transactions.component';

const routes: Route[] = [
  {
    path: ':dossierId',
    component: TransactionsPageComponent,
    data: {
      useFooter: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsPageRoutingModule {}
