import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { FollowUpComponent } from './follow-up.component';
import { ResumenComponent } from './views/resumen/resumen.component';

import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from './components/components.module';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  CommonModule,
  CoreModule,
  FollowUpRoutingModule,
  SharedModule,
  ComponentsModule
];
const COMPONENTS = [
  FollowUpComponent,
  ResumenComponent
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
  imports: [...MODULES],
  // providers: [ ...INTERCEPTORS], // providers: [...PROVIDERS, ...INTERCEPTORS],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FollowUpModule { }
