import { Component } from '@angular/core';
import { trace } from '@angular/fire/compat/performance';
import { LoginService } from '@shared/services/login/login.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { EncrDecrService } from '@shared/services/utils/encr-decr/encr-decr.service';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginDisplay = false;
  constructor(
    private _encrDecrService: EncrDecrService,
    public _loginService: LoginService,
    analytics: AngularFireAnalytics
  ) {
    // analytics.logEvent('page_view', {'page_location': 'event_path'});
    // console.log('DOCKERFILE accessReport: ', environment.accessReport);
    // const encrp = this._encrDecrService.get(environment.DEV_LEO);
    // console.log('Gitlab DEV_LEO: ', encrp);


    // const deviomc = '{"apiKey":"AIzaSyCHGWLuoTlzuIdVSRRTQTNQjqkbEOIWnno","authDomain":"ikso-corp-aggregator-desa.firebaseapp.com","projectId":"ikso-corp-aggregator-desa","storageBucket":"ikso-corp-aggregator-desa.appspot.com","messagingSenderId":"579052297162","appId":"1:579052297162:web:3b8795c6baaa804f2f4d33"}';
    // const certiomc = '{"apiKey":"AIzaSyBSFADbif8PqeMINzvGTr3oakqhEAzD-nc","authDomain":"ikso-corp-aggregator-qa.firebaseapp.com","projectId":"ikso-corp-aggregator-qa","storageBucket":"ikso-corp-aggregator-qa.appspot.com","messagingSenderId":"116434935639","appId":"1:116434935639:web:15a2b0229d046ad90c6812","measurementId":"G-KDG0E5XQ7R"}';
    // const prodiomc = '{"apiKey":"AIzaSyDIVubOW6zeqE1K3qKfdq8mMq69tc-utaU","authDomain":"ikso-corp-aggregator-prod.firebaseapp.com","projectId":"ikso-corp-aggregator-prod","storageBucket":"ikso-corp-aggregator-prod.appspot.com","messagingSenderId":"1035876017671","appId":"1:1035876017671:web:4dac51bbeae4d3980e6ca2"}';
    // const devwtp = '{"apiKey":"AIzaSyCHGWLuoTlzuIdVSRRTQTNQjqkbEOIWnno","authDomain":"ikso-corp-aggregator-desa.firebaseapp.com","projectId":"ikso-corp-aggregator-desa","storageBucket":"ikso-corp-aggregator-desa.appspot.com","messagingSenderId":"579052297162","appId":"1:579052297162:web:ef69a4bf6fa0a1c82f4d33"}';
    // const certwtp = '{"apiKey":"AIzaSyBSFADbif8PqeMINzvGTr3oakqhEAzD-nc","authDomain":"ikso-corp-aggregator-qa.firebaseapp.com","projectId":"ikso-corp-aggregator-qa","storageBucket":"ikso-corp-aggregator-qa.appspot.com","messagingSenderId":"116434935639","appId":"1:116434935639:web:b3a9025574fdd3ee0c6812","measurementId":"G-CE9E2BEC80"}';
    // const prodwtp = '{"apiKey":"AIzaSyDIVubOW6zeqE1K3qKfdq8mMq69tc-utaU","authDomain":"ikso-corp-aggregator-prod.firebaseapp.com","projectId":"ikso-corp-aggregator-prod","storageBucket":"ikso-corp-aggregator-prod.appspot.com","messagingSenderId":"1035876017671","appId":"1:1035876017671:web:80dd9d7b553946d90e6ca2"}';
    // const devazure = '3b7ff228-2ff3-4bd2-9d17-5be41d16b124';
    // const certazure = 'acf0cbf6-cab9-43b8-97ec-06a4d9dd9a61';
    // const prodazure = 'c12598f1-f468-4877-b163-4346816c93c0';
    // const devfirelogin = {"apiKey":"AIzaSyCHGWLuoTlzuIdVSRRTQTNQjqkbEOIWnno","authDomain":"ikso-corp-aggregator-desa.firebaseapp.com","projectId":"ikso-corp-aggregator-desa","storageBucket":"ikso-corp-aggregator-desa.appspot.com","messagingSenderId":"579052297162","appId":"1:579052297162:web:fec09c18d6ca46822f4d33"};
    // const certfirelogin = {"apiKey":"AIzaSyBSFADbif8PqeMINzvGTr3oakqhEAzD-nc","authDomain":"ikso-corp-aggregator-qa.firebaseapp.com","projectId":"ikso-corp-aggregator-qa","storageBucket":"ikso-corp-aggregator-qa.appspot.com","messagingSenderId":"116434935639","appId":"1:116434935639:web:cd748b7285acf6330c6812","measurementId":"G-GCK97PHWP4"};
    // const prodfirelogin = {"apiKey":"AIzaSyDIVubOW6zeqE1K3qKfdq8mMq69tc-utaU","authDomain":"ikso-corp-aggregator-prod.firebaseapp.com","projectId":"ikso-corp-aggregator-prod","storageBucket":"ikso-corp-aggregator-prod.appspot.com","messagingSenderId":"1035876017671","appId":"1:1035876017671:web:c3291a7e71aee4fd0e6ca2"};

    // console.log('deviomc: ', this._encrDecrService.set(deviomc));
    // console.log('certiomc: ', this._encrDecrService.set(certiomc));
    // console.log('prodiomc: ', this._encrDecrService.set(prodiomc));
    // console.log('devwtp: ', this._encrDecrService.set(devwtp));
    // console.log('certwtp: ', this._encrDecrService.set(certwtp));
    // console.log('prodwtp: ', this._encrDecrService.set(prodwtp));
    // console.log('devazure: ', this._encrDecrService.set(devazure));
    // console.log('certazure: ', this._encrDecrService.set(certazure));
    // console.log('prodazure: ', this._encrDecrService.set(prodazure));
    // console.log('devfirelogin: ', this._encrDecrService.set(devfirelogin));
    // console.log('certfirelogin: ', this._encrDecrService.set(certfirelogin));
    // console.log('prodfirelogin: ', this._encrDecrService.set(prodfirelogin));
  }

}
