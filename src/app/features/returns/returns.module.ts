import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnsRoutingModule } from './returns-routing.module';


import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

// COMPONENTS
import { ReturnsComponent } from './returns.component';
import { step1FoComponent } from './views/step1-fo/step1.component';
import { step2FoComponent } from './views/step2-fo/step2.component';
import { step3FoComponent } from './views/step3-fo/step3.component';
import { step4FoComponent } from './views/step4-fo/step4.component';
import { Step1NoFoComponent } from './views/step1-no-fo/step1-no-fo.component';
import { Step2NoFoComponent } from './views/step2-no-fo/step2-no-fo.component';
import { Step3NoFoComponent } from './views/step3-no-fo/step3-no-fo.component';
import { Step4NoFoComponent } from './views/step4-no-fo/step4-no-fo.component';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  ReturnsRoutingModule,
  CommonModule,
  CoreModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  ComponentsModule
];

const COMPONENTS = [
  ReturnsComponent,
  step1FoComponent,
  step2FoComponent, 
  step3FoComponent,
  step4FoComponent,
  Step1NoFoComponent,
  Step2NoFoComponent, 
  Step3NoFoComponent, 
  Step4NoFoComponent
];


@NgModule({
  declarations: [...COMPONENTS ],
  imports: [...MODULES],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})
export class ReturnsModule { }
