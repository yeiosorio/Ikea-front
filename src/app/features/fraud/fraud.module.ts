import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FraudRoutingModule } from './fraud-routing.module';
import { FraudComponent } from './fraud.component';

import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './views/list/list.component';

import { ComponentsModule } from './components/components.module';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  CommonModule,
  FraudRoutingModule,
  SharedModule,
  ComponentsModule
];
const COMPONENTS = [
  FraudComponent,
  ListComponent
];
// const PROVIDERS = [
//   LinkBackService
// ];
// const INTERCEPTORS = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: TokenYapmInterceptorInterceptor,
//     multi: true,
//   },
// ];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
  // providers: [...PROVIDERS, ...INTERCEPTORS],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FraudModule { }
