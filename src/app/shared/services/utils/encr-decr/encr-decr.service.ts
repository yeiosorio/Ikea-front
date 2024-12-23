import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '@env/environment';

// https://www.code-sample.com/2018/12/angular-7-cryptojs-encrypt-decrypt.html
// npm install crypto-js --save
// npm install @types/crypto-js --save-dev

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  REAL_KEY:string = environment.KEYENCRYPT;

  constructor() { }

    // set(keys, value){
    set(value: any){
      // console.log("tipo: ",typeof(value));
      const data = (typeof value == 'string')? value.toString(): JSON.stringify(value);
      var key = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var iv = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(data), key,
      {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
  
      return encrypted.toString();
    }
  
    //The get method is use for decrypt the value.
    // Cuando desencripte un json debera llamar a la funcion del siguiente modo: 
    //          this._encrDecrService.get(varMiJson,'json');
    // get(keys, value){
    get(value: any){
      var key = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var iv = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    }
    getJson(value: any){
      var key = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var iv = CryptoJS.enc.Utf8.parse(this.REAL_KEY);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      // return decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }

}
