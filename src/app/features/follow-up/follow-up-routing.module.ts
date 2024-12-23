import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUpComponent } from './follow-up.component';
import { ResumenComponent } from './views/resumen/resumen.component';

const routes: Routes = [
  { 
    path: '', 
    component: FollowUpComponent,
    children: [
      {
        path: 'resumen/:nroOrden',
        component: ResumenComponent,
      },
      { path: '', redirectTo: 'resumen/0', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpRoutingModule { }
