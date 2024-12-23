import { isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/****** Interceptor ******/
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenYapmInterceptorInterceptor } from '@core/interceptors/token-yapm-interceptor.interceptor';

/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/****** FIREBASE ******/
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireRemoteConfigModule, SETTINGS as REMOTE_CONFIG_SETTINGS, DEFAULTS as REMOTE_CONFIG_DEFAULTS } from '@angular/fire/compat/remote-config';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService  } from '@angular/fire/compat/analytics';

/****** AZURE AD ******/
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel
} from '@azure/msal-browser';
import {
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalRedirectComponent
} from '@azure/msal-angular';

// https://medium.com/zurvin/angular-datepipe-cambiando-el-idioma-68e16b74c943
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { environment } from '@env/environment';
registerLocaleData(localeEs, 'es');

import { EncrDecrService } from '@shared/services/utils/encr-decr/encr-decr.service';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal
const msal = environment.MSAL_ADB2C;

// DESCENCRIPTADO DE LA VARIABLE DE CONFIGURACION DE FIREBASE
const _encrDecrService = new EncrDecrService;
let envFire = {};
try {
  envFire = _encrDecrService.getJson(String(environment.firebase));
} catch (err) {
  console.log(err);
}

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  const envMSALClientId = _encrDecrService.get(environment.MSAL_ADB2C.clientId);
  return new PublicClientApplication({
    auth: {
      // clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6', // Prod enviroment. Uncomment to use. 
      clientId: envMSALClientId, // PPE testing environment
      // authority: msal.authority_login, // Prod environment. Uncomment to use.
      // authority: 'https://login.windows-ppe.net/common', // PPE testing environment.
      redirectUri: msal.redirectUri,
      postLogoutRedirectUri: msal.postLogoutRedirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  // protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: '/wait'
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // core & shared
    SharedModule,
    BrowserAnimationsModule,
    MsalModule,
    
    AngularFireModule.initializeApp(envFire),
    AngularFireRemoteConfigModule,
    AngularFireAnalyticsModule,
  ],
  providers: [
    { provide: REMOTE_CONFIG_SETTINGS, useFactory: () => isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {} },
    {
      provide: LOCALE_ID, useValue: 'es-ES'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenYapmInterceptorInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
