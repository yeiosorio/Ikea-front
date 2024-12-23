import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AccessComponent } from './views/access/access.component';
import { ReturnRequestOptionsComponent } from './views/return-request-options/return-request-options.component';
import { NoFoOptionComponent } from './views/no-fo-option/no-fo-option.component';
import { LoginReturnGuard } from '@core/guards/login-return.guard';
import { ReturnGuard } from '@core/guards/return.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'access',
    component: AccessComponent,
    canActivate: [LoginReturnGuard]
  },
  {
    path: 'return-request-menu',
    component: ReturnRequestOptionsComponent,
    canActivate: [ReturnGuard]
  },
  {
    path: 'no-fullfilment-order',
    component: NoFoOptionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
