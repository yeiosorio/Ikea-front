import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AzureAdComponent } from './azure-ad.component';

const routes: Routes = [
  {
    path: '', component: AzureAdComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AzureAdRoutingModule {}
