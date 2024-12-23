import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/****** Core Module ******/
// import { CoreModule } from '@core/core.module';
/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccessComponent } from './views/access/access.component';
import { ReturnRequestOptionsComponent } from './views/return-request-options/return-request-options.component';
import { NoFoOptionComponent } from './views/no-fo-option/no-fo-option.component';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  CommonModule,
  CoreModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  HomeRoutingModule
  
];
const COMPONENTS = [
  HomeComponent,
  AccessComponent,
  ReturnRequestOptionsComponent
];

@NgModule({
  declarations: [...COMPONENTS, NoFoOptionComponent],
  imports: [...MODULES],
  // providers: [...PROVIDERS, ...INTERCEPTORS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
