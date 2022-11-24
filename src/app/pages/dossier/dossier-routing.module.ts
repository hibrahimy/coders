import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DossierPageComponent } from './dossier.component';

const routes: Route[] = [
  {
    path: '',
    component: DossierPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierPageRoutingModule {}
