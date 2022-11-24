import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AdvancecodePageComponent } from './advance-code.component'

const routes: Route[] =[
  {
    path: '',
    component: AdvancecodePageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancecodePageRoutingModule {}
