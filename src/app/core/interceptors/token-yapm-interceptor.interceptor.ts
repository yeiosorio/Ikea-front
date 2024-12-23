import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';
// import { REQUEST_ID } from '@feature/login/services/request-id-generator';
// import { AuthUtilsService } from '@feature/login/services/auth-utils.service';


@Injectable()
export class TokenYapmInterceptorInterceptor implements HttpInterceptor {

  constructor(
    // private inj: Injector
    // private authService: AuthUtilsService
    public router: Router,
    private loginService: LoginService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('----> coeApi ruta 1: ', req.url);
    // if (req.headers.has('Authorization')) {
      //   // console.log('Ya tiene header.', req.headers.has('Authorization'));
      //   return next.handle(req);
      // }
      
      // const coeApiService = this.inj.get(CoeApiService);
      // const coeApi = coeApiService.getCoeApi();
    // let token ='';
    // console.log('RUC URL: ', req);
    // if (req.url.includes('v2/service-orders/') && req.url.includes('v2/status') && req.url.includes('v2/service-types')) {
      let tokenn = '';
      // this.temporalToken();
      tokenn = this.loginService.getToken();
      // tokenn = localStorage.getItem('IKSO-token')+'';
      // console.log('intercept: ', tokenn);
      if (!this.ignoreUrl(req.url)) {
        req = req.clone({
          headers:
            req.headers
              // .set('x-environment', 'QA')
              .set('Authorization', 'Bearer '+ tokenn)
              .set("x-platform", "IOMC")
              // .set("Access-Control-Allow-Origin", "*")
              // .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
              // .set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        });
      }
    // }
    // // console.log('----> coeApi interceptor 2: ', coeApi);
    // if (!this.ignoreUrl(req.url)) {
    //   req = req.clone({
    //     headers:
    //       req.headers
    //         // .set('x-auth-token', token)
    //         .set('x-environment', 'QA')
    //         .set('Authorization', 'Bearer '+tokenn)
    //         // .set('caller-name', 'YAPM-WEB')
    //         // .set('Request-ID', REQUEST_ID.next())
    //         // .set('company-id', '1')
    //         // .set('Strict-Transport-Security', 'max-age=31536000')
    //         // .set('X-Frame-Options', 'SAMEORIGIN')
    //         // .set('X-XSS-Protection', '1; mode=block')
    //         // .set('X-Content-Type-Options', 'nosniff')
    //         // .set('Referrer-Policy', 'no-referrer-when-downgrade')
    //         // .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    //         // .set('Pragma', 'no-cache')
    //         // .set('Arr-Disable-Session-Affinity', 'true')
    //   });
    // }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en el interceptor del token');
        if (error.status == 401) {
          // this.newAauthService.logout();
        }
        return throwError(error);
      })
    );
  }

  ignoreUrl(url: string) {
    let respuesta = false;
    const urlsIgnore = [
      // 'http://localhost:4200/mrch-rplm-iksosp/v1/authorization',
      'http://localhost:3000',
      // 'http://localhost:3000/ux-channel-yapm-massive-payment/channel/yapm/v1/massive-payments/payrolls',
      // 'http://localhost:3000/ux-channel-yapm-customer-company/channel/yapm/v1/customer-company/account/validate',
      // '/utils/revoke-token'
    ];

    urlsIgnore.forEach(urlIgnore => {
      if (url.includes(urlIgnore)) {
        respuesta = true;
      }
    });
    // console.log('ruta: ', url, respuesta);
    return respuesta;
  }

}
