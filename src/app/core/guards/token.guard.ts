import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { LoginService } from '@shared/services/login/login.service';
import { last, Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate, CanLoad  {
  constructor(
    private router: Router,
    private authService: MsalService,
    private loginService: LoginService,
  ) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.loginService.isLoggedIn()
        .then((res: string) => {
          if (res === environment.statesLogin[0]) {
            resolve(true);
          } else {
            resolve(this.router.navigate(['/wait']));
          }
        }).catch(() => {
          resolve(this.router.navigate(['/wait']));
        });

    });

    // if (this.loginService.isLoggedIn()) {
    //   return true;
    // } else {
    //   return this.router.navigate(['/wait']);
    // }
      // return new Promise((resolve) => {
      //   this.authService.handleRedirectObservable().pipe(last())
      //     .subscribe({
      //       next: (response: AuthenticationResult) => {
      //         console.log('G-------------00010', response);
      //         if (response != null && response.account != null ) {
      //           console.log('G-------------00011', response);
      //           this.checkAndSetActiveAccount();
      //           resolve(true);
      //         } else {
      //           console.log('G-------------00012', response);
      //           resolve(this.returnWait());
      //         }
      //       },
      //       error: (_error) => {
      //         console.log('G-------------00013');
      //         resolve(this.returnWait());
      //       }
      //     });
      //   console.log('G-------------00014');
      // });
      // return true;
  }
  returnWait(): boolean {
    setTimeout(() => {
      this.router.navigate(['/wait']);
    }, 1);
    console.log('G-------------00015');
    return false;
  }
  checkAndSetActiveAccount(){
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }
}
