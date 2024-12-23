import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnsComponent } from './returns.component';
import { step1FoComponent } from './views/step1-fo/step1.component';
import { step2FoComponent } from './views/step2-fo/step2.component';
import { step3FoComponent } from './views/step3-fo/step3.component';
import { step4FoComponent } from './views/step4-fo/step4.component';
import { Step1NoFoComponent } from './views/step1-no-fo/step1-no-fo.component';
import { Step2NoFoComponent } from './views/step2-no-fo/step2-no-fo.component';
import { Step3NoFoComponent } from './views/step3-no-fo/step3-no-fo.component';
import { Step4NoFoComponent } from './views/step4-no-fo/step4-no-fo.component';
import { environment } from '@env/environment';

let routes: Routes
if (environment.returnBlock) {
  routes = [
    { 
      path: '',
      component: ReturnsComponent,
      redirectTo: 'home',
      children: [
        {
          path: 'step1-fo',
          component: step1FoComponent,
        },
        {
          path: 'step2-fo',
          component: step2FoComponent,
        },
        {
          path: 'step3-fo',
          component: step3FoComponent,
        },
        {
          path: 'step4-fo',
          component: step4FoComponent,
        },
        {
          path: 'step1-no-fo',
          component: Step1NoFoComponent,
        },
        {
          path: 'step2-no-fo',
          component: Step2NoFoComponent,
        },
        {
          path: 'step3-no-fo',
          component: Step3NoFoComponent,
        },
        {
          path: 'step4-no-fo',
          component: Step4NoFoComponent,
        },
        { path: '', redirectTo: 'step1-fo', pathMatch: 'full' },
      ],
     }
  ];
} else {
  routes = [
    { 
      path: '',
      component: ReturnsComponent,
      children: [
        {
          path: 'step1-fo',
          component: step1FoComponent,
        },
        {
          path: 'step2-fo',
          component: step2FoComponent,
        },
        {
          path: 'step3-fo',
          component: step3FoComponent,
        },
        {
          path: 'step4-fo',
          component: step4FoComponent,
        },
        {
          path: 'step1-no-fo',
          component: Step1NoFoComponent,
        },
        {
          path: 'step2-no-fo',
          component: Step2NoFoComponent,
        },
        {
          path: 'step3-no-fo',
          component: Step3NoFoComponent,
        },
        {
          path: 'step4-no-fo',
          component: Step4NoFoComponent,
        },
        { path: '', redirectTo: 'step1-fo', pathMatch: 'full' },
      ],
     }
  ];
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnsRoutingModule { }
