import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnsAssociatedComponent } from './returns-associated.component';

const routes: Routes = [{ path: '', component: ReturnsAssociatedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnsAssociatedRoutingModule { }
