import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OrderCompleteGetAdapterModel,
  IOrderComplete,
  IOrderCompleteGetResponseModel,
  ICancelled,
  ICancelledGetResponseModel,
  CancelledGetAdapterModel,
} from '@shared/models/orders.model';


@Injectable({
  providedIn: 'root'
})
export class OrderHttp {
  
  apiBase = `${environment.API_BASE}`;
  orderDetail = `${environment.orderDetail}`;

  constructor(private http: HttpClient) { }

  /**
   * @desc Http se obtiene el resumen de la orden.
   * @Method GET
   * @returns Observable<IOrderComplete>
   */
  getOrder(orderId: string): Observable<IOrderComplete> {
    
    return this.http.get<IOrderCompleteGetResponseModel>
      (`${this.apiBase}/${this.orderDetail}?orderId=${orderId}`)
      .pipe(
        map((data: IOrderCompleteGetResponseModel) => new OrderCompleteGetAdapterModel(data) )
      );

  }

  /**
   * @desc Http cancelar una orden.
   * @Method POST
   * @returns Observable<ICancelled>
   */
  postCancelledOrder(orderId: string): Observable<ICancelled> {
    
    return this.http.post<ICancelledGetResponseModel>
      (`${this.apiBase}/iomc-cancellations/orders/cancellation`, {
        sourceOrderId: orderId,
        // sourceCancelRequestId: '12'
      })
      .pipe(
        map((data: ICancelledGetResponseModel) => new CancelledGetAdapterModel(data) )
      );

  }
}
