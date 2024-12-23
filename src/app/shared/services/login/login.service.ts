import { Inject, Injectable } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionStatus,
  RedirectRequest,
  EventMessage,
  EventType
} from '@azure/msal-browser';
import { catchError, concatMap, filter, last, of, Subject, takeUntil } from 'rxjs';
import { ValidateHttp } from '../http/validate.http';
import { EncrDecrService } from '../utils/encr-decr/encr-decr.service';
import { LocalStorageService } from '../utils/local-storage/local-storage.service';
import { environment } from '@env/environment';
import { KEY_FORMAT_JWK } from '@azure/msal-browser/dist/utils/BrowserConstants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  statesLogin = environment.statesLogin;
  loggedIn = this.statesLogin[2];
  private homeAccountId = '';
  private token = '';
  private email = '';
  private loginReport = '';
  private loginReturn = '';

  enviro = environment.accessReport;
  envReturn = environment.accessReturn;

  openLoginAccess: boolean = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private _localStorageService:LocalStorageService,
    private _encrDecrService:EncrDecrService,
    private _validateHttp: ValidateHttp
  ) { }

  initMsal(): Promise<boolean> {
    this.authService.instance.enableAccountStorageEvents();

    return new Promise((resolve, reject) => {
      this.authService.handleRedirectObservable().pipe(last())
        .subscribe({
          next: (response: AuthenticationResult) => {
            // console.log('-------------00010', response);
            if (response != null && response.account != null ) {
              // console.log('-------------00011', response);
              this.homeAccountId = response.account.homeAccountId;
              // this.loggedIn = true;
              // console.log('Token Edgar: ', response,response.idToken);
              this.setToken(response.idToken);
              this.checkAndSetActiveAccount();
              resolve(true);
            } else {
              // console.log('-------------00012', response);
              // this.cleanExternalLocalstorage();
              resolve(false);
            }
          },
          error: (error) => {
            console.log('handleRedirectObservable: ', error);
            reject(error);
          }
        });
    });
  }

  isLoggedIn(): Promise<string> {

    return new Promise((resolve, reject) => {
      const data = this.authService.instance.getAllAccounts();
      if (data?.length > 0) {
        this.validate((data[0].username).toLowerCase())
          .then((res: string) => {
            if (res == '200') {
              this.loggedIn = this.statesLogin[0];
            } else {
              this.loggedIn = this.statesLogin[1];
            }
            resolve(this.loggedIn);
          }).catch(() => {
            this.loggedIn = this.statesLogin[1];
            console.log('Error msal isLoggedIn');
            reject(this.loggedIn);
          });
      } else {
        this.loggedIn = this.statesLogin[2];
        resolve(this.loggedIn);
      }
    });
  }
  login(){
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  /**
   * OK
   */
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
  logout(){
    console.log('>>>>> logout: ');
    this.loggedIn = this.statesLogin[2];

    const currentAccount = this.authService.instance.getAccountByHomeId(this.homeAccountId);
    
    this.authService.logoutRedirect({ account: currentAccount})
      .subscribe({
        next: (response) => {
          console.log('logoutRedirect: ', response);
          this.cleanExternalLocalstorage();
        },
        error: (error) => {
          console.log('error logoutRedirect: ', error);
        }
      });
  }

  // Login para los reportes
  reportLogin(passReport: string): boolean{
    if (passReport === this.enviro) {
      this.setLoginReport(passReport);
      return true;
    } else {
      this.removeLoginReport();
      return false;
    }
  }
  // Login para los devoluciones
  returnLogin(passReturn: string): boolean{
    if (passReturn === this.envReturn) {
      this.setLoginReturn(passReturn);
      return true;
    } else {
      this.removeLoginReturn();
      return false;
    }
  }

  // Valida que esta logueado para acceder a los reportes
  isLoggedInReport(): boolean {
    const accessReport = this.getLoginReport();

    return (accessReport === '')? false: true;
  }
  // Valida que esta logueado para acceder a los devoluciones
  isLoggedInReturn(): boolean {
    const accessReturn = this.getLoginReturn();

    return (accessReturn === '')? false: true;
  }


  /**
   * Note: Aqui se colocara todos los localstorage, coockie u otras data que se deba borrar al cerra session.
   */
  cleanExternalLocalstorage(){
    this.removeToken();
    this.removeAccountId();
    this.removeLoginReport();
    this.removeLoginReturn();
  }


  /************ GET, SET, REMOVE ************/

  getToken(): string {
    const tokenEncr = this._localStorageService.getItem('iikc-token');
    // console.log('encrip: ',tokenEncr);
    // console.log('descrip: ', this._encrDecrService.get(tokenEncr));
    return (tokenEncr) ? this._encrDecrService.get(tokenEncr) : '';
  }
  setToken(token: string) {
    // console.log('token recibido', token)
    const tokenEncr = this._encrDecrService.set(token);
    this._localStorageService.setItem('iikc-token', tokenEncr);
    this.token = this.getToken();
  }
  removeToken() {
    this._localStorageService.removeItem('iikc-token');
    this.token = this.getToken();
  }



  getAccountId(): string {
    const accountIdEncr = this._localStorageService.getItem('accountId');
    return (accountIdEncr)?this._encrDecrService.get(accountIdEncr):'';
  }
  setAccountId(accountId: string) {
    const accountIdEncr = this._encrDecrService.set(accountId);
    this._localStorageService.setItem('accountId', accountIdEncr);
    this.homeAccountId = this.getAccountId();
  }
  removeAccountId() {
    this._localStorageService.removeItem('accountId');
    this.homeAccountId = this.getAccountId();
  }



  getLoginReport(): string {
    const tokenReportEncr = this._localStorageService.getItem('iikc-report');
    return (tokenReportEncr) ? this._encrDecrService.get(tokenReportEncr) : '';
  }
  setLoginReport(tokenReport: string) {
    const tokenReportEncr = this._encrDecrService.set(tokenReport);
    this._localStorageService.setItem('iikc-report', tokenReportEncr);
    this.loginReport = this.getLoginReport();
  }
  removeLoginReport() {
    this._localStorageService.removeItem('iikc-report');
    this.loginReport = this.getLoginReport();
  }

  getLoginReturn(): string {
    const tokenReturnEncr = this._localStorageService.getItem('iikc-return');
    return (tokenReturnEncr) ? this._encrDecrService.get(tokenReturnEncr) : '';
  }
  setLoginReturn(tokenReturn: string) {
    const tokenReturnEncr = this._encrDecrService.set(tokenReturn);
    this._localStorageService.setItem('iikc-return', tokenReturnEncr);
    this.loginReturn = this.getLoginReturn();
  }
  removeLoginReturn() {
    this._localStorageService.removeItem('iikc-return');
    this.loginReturn = this.getLoginReturn();
  }


  async validate(email: string): Promise<string>{
    return await new Promise((resolve, reject) => {
      this._validateHttp.getValidate(email).pipe(last())
        .subscribe({
          next: (res) => {
            console.log('>>>>stado: ', res.status);
            resolve(res.status);
          },
          error: (error) => {
            console.log('_validateHttp: ', error);
            reject('');
          }
        });
    });
  }

// Modal de no tienes acceso
  getModalLoginAccess(){
    return this.openLoginAccess;
  }
  setModalLoginAccess(open: boolean){
    this.openLoginAccess = open;
  }
}
