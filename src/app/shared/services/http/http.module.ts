import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';
import { OrderHttp } from './order.http';
import { ValidateHttp } from './validate.http';

// const INTERCEPTORS = [
//   { provide: HTTP_INTERCEPTORS, useClass: TokenYapmInterceptorInterceptor, multi: true },
// ];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    OrderHttp,
    ValidateHttp
    // ...INTERCEPTORS
  ],
})
export class HttpModule { }
