import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IFiltersFraud,
  IOrderFraud,
  IOrderFraudGetResponseModel,
  OrderFraudGetAdapterModel,
  IOrderFraudStatus,
  IOrderFraudStatusGetResponseModel,
  OrderFraudStatusGetAdapterModel,
} from '@shared/models/fraud.model';


@Injectable({
  providedIn: 'root'
})
export class FraudHttp {
  
  apiBase = `${environment.API_BASE}`;
  apiMock = `${environment.API_URL_MOCK}`;

  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  /**
   * @desc Http se obtiene el listado de posibles fraudes.
   * @Method GET
   * @returns Observable<IOrderFraud[]>
   */
  getOrderFraud(filters: IFiltersFraud): Observable<IOrderFraud[]> {
    let params = `?dateAscending=${filters.dateAscending}&size=${filters.size}`;
    params = (filters.status !== '') ? `${params}&status=${(filters.status + '').trim()}` : `${params}`;
    params = (filters.referenceOrderId !== '') ? `${params}&referenceId=${(filters.referenceOrderId + '').trim()}` : `${params}`;
    params = (filters.nextPage !== '') ? `${params}&nextPage=${(filters.nextPage + '').trim()}` : `${params}`;
    
    return this.http.get<IOrderFraudGetResponseModel[]>
      (`${this.apiBase}/frd-detection/detections/detection-list${params}`)
      .pipe(
        map((data: IOrderFraudGetResponseModel[]) => data.map((item) => new OrderFraudGetAdapterModel(item)))
      );

  }


  /**
   * @desc Http cambia el estado de la orden.
   * @Method PATCH
   * @returns Observable<IOrderNotification>
   */
  patchtOrderFraudStatus(id: string, status: string): Observable<IOrderFraudStatus> {

    return this.http.patch<IOrderFraudStatusGetResponseModel>
      (`${this.apiBase}/frd-detection/detections/${id}/${status}`,this.options)
      .pipe(
        map((data: IOrderFraudStatusGetResponseModel) => new OrderFraudStatusGetAdapterModel(data))
      );

  }

}
