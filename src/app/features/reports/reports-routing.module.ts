import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { AccessComponent } from './views/access/access.component';
import { ReportHomeComponent } from './views/report-home/report-home.component';

import { LoginReportsGuard } from '@core/guards/login-reports.guard';
import { ReportsGuard } from '@core/guards/reports.guard';

const routes: Routes = [
  {
    path: '', 
    component: ReportsComponent,
    children: [
      {
        path: 'access',
        component: AccessComponent
        , canActivate: [LoginReportsGuard]
      },
      {
        path: 'report-home',
        component: ReportHomeComponent
        , canActivate: [ReportsGuard]
      },
      { path: '', redirectTo: 'access', pathMatch: 'full' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
