import { Injectable } from '@angular/core';
import {
  IFiltersFraud,
  IOrderFraud,
  IOrderFraudStatus
} from '@shared/models/fraud.model';
import { FraudHttp } from '@shared/services/http/fraud.http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraudService {

  constructor(
    private fraudHttp: FraudHttp
  ) { }

  getOrderFraud(filters: IFiltersFraud): Observable<IOrderFraud[]> {
    return this.fraudHttp.getOrderFraud(filters);
  }

  patchOrderFraudStatus(id: string, status: string): Observable<IOrderFraudStatus> {
    return this.fraudHttp.patchtOrderFraudStatus(id, status);
  }
}
