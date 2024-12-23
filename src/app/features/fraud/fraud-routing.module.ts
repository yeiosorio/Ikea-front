import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FraudComponent } from './fraud.component';
import { ListComponent } from './views/list/list.component';

import { ReportsGuard } from '@core/guards/reports.guard';

const routes: Routes = [
  { 
    path: '', 
    component: FraudComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
        , canActivate: [ReportsGuard]
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],

  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraudRoutingModule { }
