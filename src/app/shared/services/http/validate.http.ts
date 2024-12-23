import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ValidateHttp {
  
  apiBase = `${environment.API_BASE}`;
  orderDetail = `${environment.orderDetail}`;

  constructor(private http: HttpClient) { }

  /**
   * @desc Http se obtiene si el email esta registrado
   * @Method GET
   * @returns Observable<any>
   */
  getValidate(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/auth/validate-email/${email}`, {observe: 'response'})
  }

}
