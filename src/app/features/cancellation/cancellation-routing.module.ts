import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancellationComponent } from './cancellation.component';
import { ListComponent } from './views/list/list.component';

import { ReportsGuard } from '@core/guards/reports.guard';

const routes: Routes = [
  { 
    path: '', 
    component: CancellationComponent,
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
export class CancellationRoutingModule { }
