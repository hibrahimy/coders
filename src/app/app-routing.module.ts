import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'dossier',
    loadChildren: () =>
      import('./pages/dossier/dossier.module').then((m) => m.DossierPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./pages/transactions/transactions.module').then(
        (m) => m.TransactionsPageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorPageModule),
  },
  {
    path: 'advance-code',
    loadChildren: () =>
      import('./pages/advance-code/advance-code.module').then(
        (m) => m.AdvancecodePageModule
      ),
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingComponent {}
