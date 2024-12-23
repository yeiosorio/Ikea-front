import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnsAssociatedRoutingModule } from './returns-associated-routing.module';
import { ReturnsAssociatedComponent } from './returns-associated.component';

import { SharedModule } from '@shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';

/****** Interceptor ******/
import { CoreModule } from '@core/core.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

const MODULES = [
  CommonModule,
  CoreModule,
  SharedModule,
  ReturnsAssociatedRoutingModule
];

@NgModule({
  declarations: [
    ReturnsAssociatedComponent,
    DetailComponent
  ],
  imports: [...MODULES],
})
export class ReturnsAssociatedModule { }
