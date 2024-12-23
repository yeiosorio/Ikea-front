import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IFiltersCancel,
  IOrderCancel,
  IOrderCancelGetResponseModel,
  IOrderNotification,
  IOrderNotificationGetResponseModel,
  OrderCancelGetAdapterModel,
  OrderNotificationGetAdapterModel
} from '@shared/models/cancellation.model';


@Injectable({
  providedIn: 'root'
})
export class CancellationHttp {
  
  apiBase = `${environment.API_BASE}`;
  apiMock = `${environment.API_URL_MOCK}`;

  options = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  /**
   * @desc Http se obtiene el listado de solicitudes de cancelacion.
   * @Method GET
   * @returns Observable<IOrderCancel[]>
   */
  getOrderCancel(filters: IFiltersCancel): Observable<IOrderCancel[]> {
    let params = `?dateAscending=${filters.dateAscending}&notified=${filters.notified}&size=${filters.size}`;
    params = (filters.status !== '') ? `${params}&status=${(filters.status + '').trim()}` : `${params}`;
    params = (filters.referenceOrderId !== '') ? `${params}&referenceOrderId=${(filters.referenceOrderId + '').trim()}` : `${params}`;
    params = (filters.nextPage !== '') ? `${params}&nextPage=${(filters.nextPage + '').trim()}` : `${params}`;
    
    return this.http.get<IOrderCancelGetResponseModel[]>
      (`${this.apiBase}/iomc/orders/order-cancelled-list${params}`)
      .pipe(
        map((data: IOrderCancelGetResponseModel[]) => data.map((item) => new OrderCancelGetAdapterModel(item)))
      );

  }


  /**
   * @desc Http cambia el estado de la notificacion (true/false).
   * @Method PATCH
   * @returns Observable<IOrderNotification>
   */
  patchtOrderNotification(id: string, notification: boolean): Observable<IOrderNotification> {

    return this.http.patch<IOrderNotificationGetResponseModel>
      (`${this.apiBase}/iomc/cancellations/${id}/notification/${notification}`,this.options)
      .pipe(
        map((data: IOrderNotificationGetResponseModel) => new OrderNotificationGetAdapterModel(data))
      );

  }

}
