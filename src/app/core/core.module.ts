import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/****** Servicios ******/
// Guard
import { TokenGuard } from './guards/token.guard';
import { ReportsGuard } from './guards/reports.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenYapmInterceptorInterceptor } from './interceptors/token-yapm-interceptor.interceptor';


const SERVICES = [
  TokenGuard,
  ReportsGuard
];
const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenYapmInterceptorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ConvertInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: FakeInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ProfilerInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: NotifyInterceptor, multi: true }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...SERVICES,
    ...INTERCEPTORS,
    // { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
