import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';
// import {
//   MsalService,
//   MsalBroadcastService,
//   MSAL_GUARD_CONFIG,
//   MsalGuardConfiguration
// } from '@azure/msal-angular';
// import {
//   AuthenticationResult,
//   InteractionStatus,
//   PopupRequest,
//   RedirectRequest,
//   EventMessage,
//   EventType
// } from '@azure/msal-browser';
import { catchError, concatMap, filter, last, of, Subject, takeUntil } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-azure-ad',
  templateUrl: './azure-ad.component.html',
  styleUrls: ['./azure-ad.component.scss']
})
export class AzureAdComponent implements OnInit, OnDestroy {

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  // apertura el toast de error del login
  errorLoginMessage = false;
  // apertura el mensaje de olvidaste tu contraseña
  visible = false;

  statesLogin = environment.statesLogin;

  constructor(
    // @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    // private authService: MsalService,
    // private msalBroadcastService: MsalBroadcastService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginService.initMsal()
      .then((_response: boolean) => {
        this.loginService.isLoggedIn()
          .then((res: string) => {
            if (res === this.statesLogin[0]) {
              this.router.navigate(['/home']);
            }
            if (res === this.statesLogin[1]) {
              this.loginService.setModalLoginAccess(true);
              this.loginService.logout();
              console.log('Solicitando Logout azure');
            }
            if (res === this.statesLogin[2]) {
              this.loginService.setModalLoginAccess(true);
              console.log('No estas logueado azure');
            }
            else {
            }
          }).catch(() => {
            this.loginService.setModalLoginAccess(true);
            console.log('No estas logueado azure');
          });
      }).catch(() => {
        console.log('Error msal -------------00013');
      });

  }


  btnLogin(){
    this.loginService.login();
  }


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
