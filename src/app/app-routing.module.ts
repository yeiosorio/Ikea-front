import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '@core/guards/token.guard';
import { ReturnGuard } from '@core/guards/return.guard';

const routes: Routes = [
  // {
  //   path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
  //   // canActivate: [LoginGuard]
  // },
  {
    path: 'wait',
    loadChildren: () => import('./features/azure-ad/azure-ad.module').then(m => m.AzureAdModule)
  },
  {
    path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
    , canLoad: [TokenGuard]
  },
  { 
    path: 'follow-up', loadChildren: () => import('./features/follow-up/follow-up.module').then(m => m.FollowUpModule)
    , canLoad: [TokenGuard]
  },
  { 
    path: 'returns', loadChildren: () => import('./features/returns/returns.module').then(m => m.ReturnsModule)
    , canLoad: [TokenGuard, ReturnGuard]
  },
  {
    path: 'reports', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule)
    , canLoad: [TokenGuard]
  },
  {
    path: 'cancellation', loadChildren: () => import('./features/cancellation/cancellation.module').then(m => m.CancellationModule)
    , canLoad: [TokenGuard]
  },
  {
    path: 'fraud', loadChildren: () => import('./features/fraud/fraud.module').then(m => m.FraudModule)
    , canLoad: [TokenGuard]
  },
  {
    path: 'returns-associated', loadChildren: () => import('./features/returns-associated/returns-associated.module').then(m => m.ReturnsAssociatedModule)
    , canLoad: [TokenGuard, ReturnGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'wait'},
  { path: '**', pathMatch: 'full', redirectTo: 'wait'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
