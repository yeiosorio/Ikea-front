import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IListStoresComplete,
} from '@shared/models/listStores.model';
import { IReasons, 
  IReasonsGetResponseModel, 
  ISkuDetailReturn, 
  ISkuDetailReturnGetResponseModel, 
  ReasonsGetAdapterModel, 
  SkuDetailReturnGetAdapterModel,
  IAvailabilityRequest,
  IAvailabilityResponse,
  ILogisticDetail,
  ILogisticDetailGetResponse,
  LogisticDetailGetAdapterModel,
  IGeographic,
  IReservationCreateRequest,
  IRLOCreate,
  IReverseStatus
} from '@shared/models/return.model';


@Injectable({
  providedIn: 'root'
})
export class ReturnHttp {

  apiBase = `${environment.API_BASE}`;
  listStores = `${environment.listStores}`;
  reasons = `${environment.reasons}`;
  products = `${environment.products}`;
  geographic = `${environment.geographic}`;
  availability = `${environment.availability}`;
  logisticDetail = `${environment.logisticDetail}`;
  reservation = `${environment.reservation}`;
  reverseOrder = `${environment.reverseOrder}`;

  constructor(private http: HttpClient) { }

  /**
   * @desc Http se obtiene lista de tiendas disponibles por comuna.
   * @Method GET
   * @returns Observable<IOrderComplete>
   * @param politicalId
   */
  getListStores(politicalId?: string): Observable<IListStoresComplete[]> {
    return this.http.get<any>
      (`${this.apiBase}/${this.listStores}?politicalAreaId=${politicalId}`)
      .pipe(
        map((data => data))
      );
  }

  /**
   * @desc Http se obtiene listado de regiones o comunas.
   * @Method GET
   * @returns Observable<any>
   * @param politicalId
   */
  getLocations(politicalId?: string, comuna?: string, politicalFilter?: string): Observable<IGeographic> {

    let path = `?parent=${politicalId}`;
    if (comuna)
      path = `/states/${politicalId}/districts`;

    if (politicalFilter === 'politicalAreaId')
      path = `?politicalAreaId=${politicalId}`;

    return this.http.get<IGeographic>
      (`${this.apiBase}/${this.geographic}${path}`)
      .pipe(
        map(value => value)
      );
  }

  /**
   * @desc Http se obtiene listado reverse order by FO.
   * @Method GET
   * @returns Observable<any>
   * @param orderId
   */
  reverseOrderList(logisticOrderId: string): Observable<any> {
    return this.http.get<any>
      (`${this.apiBase}/rlo/orders/${logisticOrderId}`)
      .pipe(
        map(value => value)
      );
  }
  
  /**
   * @desc Http se obtiene listado reverse order by FO.
   * @Method GET
   * @returns Observable<any>
   * @param orderId
   */
   getReverseStatus(reverseLogisticId: string): Observable<IReverseStatus> {
    return this.http.get<IReverseStatus>
      (`${this.apiBase}/rlo/orders/status/${reverseLogisticId}`)
      .pipe(
        map(value => value)
      );
  }

  /**
   * @desc Http se busca por sku el producto a devolver
   * @Method GET
   * @returns Observable<ISkuDetailReturn>
   */
  getSearchSKU(sku: string): Observable<ISkuDetailReturn> {
    return this.http.get<ISkuDetailReturnGetResponseModel>
      (`${this.apiBase}/${this.products}/${sku}`)
      .pipe(
        map((data: ISkuDetailReturnGetResponseModel) => new SkuDetailReturnGetAdapterModel(data) )
      );
  }

  /**
   * @desc Http obtiene lista de motivos, submotivos y condiciones
   * @Method GET
   * @returns Observable<IReasons>
   */
  getReasons(): Observable<IReasons> {
    return this.http.get<IReasonsGetResponseModel>
      (`${this.apiBase}/${this.reasons}`)
      .pipe(
        map((data: IReasonsGetResponseModel) => new ReasonsGetAdapterModel(data))
      );
  }

  /**
   * @desc Http obtiene disponibilidad para retiro a domicilio
   * @Method GET
   * @returns Observable<IAvailabilityResponse>
   */
  getAvailability(reverseObj: IAvailabilityRequest): Observable<IAvailabilityResponse> {
    return this.http.post<IAvailabilityResponse>
    (`${this.apiBase}/${this.availability}`, reverseObj)
      .pipe(
        map(data => data)
      );
  }

  /**
   * @desc Http crea reverse order
   * @Method GET
   * @returns Observable<IAvailabilityResponse>
   */
  reverseOrderCreate(reverseOrderCreation: IRLOCreate): Observable<any> {
    return this.http.post<any>
    (`${this.apiBase}/${this.reverseOrder}`, reverseOrderCreation)
      .pipe(
        map(data => data)
      );
  }

  /**
   * @desc Http crea reservacion de agenda
   * @Method GET
   * @returns Observable<IReservationCreateRequest>
   */
  reservationCreate(reservation: IReservationCreateRequest): Observable<any> {
    return this.http.post<any>
    (`${this.apiBase}/${this.reservation}`, reservation)
      .pipe(
        map(data => data)
      );
  }
  
  /**
   * @desc Http confirma la reservacion
   * @Method GET
   * @returns Observable<IReservationCreateRequest>
   */
   reservationConfirm(reservationId: string): Observable<any> {
    return this.http.patch<any>
    (`${this.apiBase}/rlo/orders/reservation/${reservationId}/confirm`, {})
      .pipe(
        map(data => data)
      );
  }

  /**
   * @desc Http obtiene detalles de la orden para la devolucion
   * @Method GET
   * @returns Observable<ILogisticDetail>
   */
  getLogisticDetail(orderId: string): Observable<ILogisticDetail> {
    return this.http.get<ILogisticDetailGetResponse>
      (`${this.apiBase}/${this.logisticDetail}/${orderId}`)
      .pipe(
        map((data: ILogisticDetailGetResponse) => new LogisticDetailGetAdapterModel(data))
      );
  }
}
