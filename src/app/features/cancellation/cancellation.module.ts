import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancellationRoutingModule } from './cancellation-routing.module';
import { CancellationComponent } from './cancellation.component';

import { SharedModule } from '@shared/shared.module';
import { ListComponent } from './views/list/list.component';

import { ComponentsModule } from './components/components.module';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  CommonModule,
  CoreModule,
  CancellationRoutingModule,
  SharedModule,
  ComponentsModule,
];
const COMPONENTS = [
  CancellationComponent,
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
  imports: [...MODULES],
  // providers: [ ...INTERCEPTORS], // [...PROVIDERS, ...INTERCEPTORS]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CancellationModule { }
