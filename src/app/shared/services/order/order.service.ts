import { Injectable } from '@angular/core';
// import { EncrDecrService } from '../utils/encr-decr/encr-decr.service';
import { LocalStorageService } from '../utils/local-storage/local-storage.service';
import { ICancelled, IOrderComplete } from '@shared/models/orders.model';
import { OrderHttp } from '@shared/services/http/order.http';
import { BehaviorSubject, take } from 'rxjs';
import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private data = new BehaviorSubject<any>('');
  public orderResumen$ = this.data.asObservable();
  private orderDetail!: IOrderComplete;

  constructor(
    private _localStorageService: LocalStorageService,
    private orderHttp: OrderHttp,
    // private _encrDecrService: EncrDecrService,
  ) { }

  // ORDER DETAIL POR LOCALSTORAGE
  getOrderDetail(orderId: string): IOrderComplete {
    const orderEncr = this._localStorageService.getItem(`orderDetail`);
    if (orderEncr) {
      const data = orderEncr;
      if (data.id === orderId) {
        // convierte en json el string desencriptado
        this.orderDetail = data.value as IOrderComplete;
        return this.orderDetail;
      }
    }
    this.orderDetail = {} as IOrderComplete;
    return this.orderDetail;
  }

  setOrderDetail(orderId: string, obj: IOrderComplete) {
    const data = {id:orderId,value:obj};
    this._localStorageService.setItem(`orderDetail`, data);
    this.orderDetail = this.getOrderDetail(orderId);
  }

  removeOrderDetail(orderId: string) {
    if (this._localStorageService.getItem(`orderDetail`)) {
      this._localStorageService.removeItem(`orderDetail`);
    }
    this.orderDetail = this.getOrderDetail(orderId);
  }

  // ORDER DETAIL POR HTTP AND LOCALSTORAGE
  getOrderRefresh(orderId: string): Promise<IOrderComplete> {

    return new Promise((resolve, reject) => {
      const data = this.getOrderDetail(orderId);
      if (Object.keys(data).length === 0) {
        // console.log('Carga data desde servidor por primera vez');
        this.orderHttp.getOrder(orderId)
          .subscribe({
            next: (res: IOrderComplete)=> {
              this.setOrderDetail(orderId, res);
              resolve(res);
            },
            error: (err) => {
              console.log(err);
              reject(err);
            },
            complete: () => {console.log('complete');}
          });
      } else {
        // console.log('carga data del local storage');
        resolve(data);
      }

    });
  }

  getOrderService(orderId: string, refresh: boolean = true): Promise<IOrderComplete> {
    
    return new Promise((resolve, reject) => {
      let dataStorage = this.getOrderDetail(orderId);

      if (Object.keys(dataStorage).length === 0 || refresh) {
        this.orderHttp.getOrder(orderId).subscribe({
          next: (value) => {
            this.removeOrderDetail(orderId);
            this.setOrderDetail(orderId, value);
            resolve(value);
          },
          error: (error: any) => {
            reject(error);
          }
        });
      }else {
        resolve(dataStorage)
      }
    });
  }

  shareDataReturns(orderDetail: IOrderComplete) {
    this.data.next(orderDetail);
  }


  /**
   * @desc Solicitud de cancelacion
   */
  orderCancelled(orderId: string): Promise<ICancelled> {
    
    return new Promise((resolve, reject) => {
        this.orderHttp.postCancelledOrder(orderId).subscribe({
          next: (value: ICancelled) => {
            resolve(value);
          },
          error: (error: any) => {
            reject(error);
          }
        });
    });
  }

  /**
   * @desc Cliente notificado
   */
  orderLogisticCancelled(orderId: string, notification: boolean, logisticCancelRequestId: string): Promise<boolean> {
    
    return new Promise((resolve, _reject) => {
      // FIXED: IMPLEMENTAR ESTA FUNCTION_TYPE, DEFINIR CONTRATO
      setTimeout(() => {
        console.log(orderId, notification, logisticCancelRequestId);
        resolve(true);
      }, 2000);
    });
  }
}
