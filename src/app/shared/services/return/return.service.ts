import { Injectable } from '@angular/core';
import {
  IReasons,
  ISkuDetailReturn,
  IAvailabilityRequest,
  IAvailabilityResponse,
  ILogisticDetail,
  IGeographic,
  IReservationCreateRequest,
  IRLOCreate,
  IReverseStatus
} from '@shared/models/return.model';
import { ReturnHttp } from '@shared/services/http/return.http';
import {
  BehaviorSubject,
  Observable,
  take,
  of
} from 'rxjs';
import { IListStoresComplete } from '@shared/models/listStores.model';
import { SessionStorageService } from '../utils/session-storage/session-storage.service';
import { LocalStorageService } from '../utils/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  private data = new BehaviorSubject<any>('');
  public step$ = this.data.asObservable();
  private scrollCalendar = new BehaviorSubject<boolean>(false);
  public scrollInputCalendar$ = this.scrollCalendar.asObservable();
  private reasonsData!: IReasons;

  constructor(
    private returnHttp: ReturnHttp,
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
  ) { }

  setLocalData(stepId: string, obj: {}) {
    this._sessionStorageService.setItem(stepId, obj);
  }

  getLocalData(stepId: string) {
    return this._sessionStorageService.getItem(stepId);
  }

  getLocalOrderDetail(stepId: string) {
    return this._localStorageService.getItem(stepId);
  }

  removeLocalData(stepId: string) {
    return this._sessionStorageService.removeItem(stepId);
  }

  getListStores(politicalId?: string): Promise<IListStoresComplete[]> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getListStores(politicalId).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  getAvailability(reverseObj: IAvailabilityRequest): Promise<IAvailabilityResponse> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getAvailability(reverseObj).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  reverseOrderCreate(reverseOrderCreation: IRLOCreate): Promise<any> {
    return new Promise((resolve, reject) => {
      this.returnHttp.reverseOrderCreate(reverseOrderCreation).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  reservationCreate(reservation: IReservationCreateRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.returnHttp.reservationCreate(reservation).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  reservationConfirm(reservationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.returnHttp.reservationConfirm(reservationId).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  getLocations(politicalId?: string, comuna?: string, politicalFilter?: string): Promise<IGeographic> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getLocations(politicalId, comuna, politicalFilter).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  reverseOrderList(logisticOrderId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.returnHttp.reverseOrderList(logisticOrderId).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  getReverseStatus(reverseLogisticId: string): Promise<IReverseStatus> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getReverseStatus(reverseLogisticId).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

  setNextStep(stepId: string) {
    this.data.next(stepId);
  }

  setScrollCalendar() {
    this.scrollCalendar.next(true);
  }
  // validateRutCO() { 

  // }

  validateRutCL(dni: string): Observable<boolean> {
    let validRut = true;
    if (!/^[0-9]+-[0-9kK]{1}$/.test(dni)) {
      validRut = false;
    }

    let tmp = dni.split('-');
    let digv = tmp[1];
    let rut = tmp[0];
    if (digv == 'K') digv = 'k';

    if (this.digitVerify(rut) == digv && validRut) {
      return of(true);
    } else {
      return of(false);
    }
  }

  digitVerify(T: any) {
    let M = 0
    let S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;

    return S ? S - 1 : 'k';
  }

  /** 
   * @desc Retorna la busqueda solicitada
   */
  searchSKU(term: string): Observable<ISkuDetailReturn> {
    return this.returnHttp.getSearchSKU(term);
  }

  /* DATOS DE MOTIVOS, SUBMOTIVOS Y CONDICIONES */
  getReasons(): IReasons {
    const reasonsEncr = this._sessionStorageService.getItem(`reasons`);
    if (reasonsEncr) {
      // convierte en json el string desencriptado
      this.reasonsData = JSON.parse(reasonsEncr) as IReasons;
    } else {
      this.reasonsData = {} as IReasons;
    }

    return this.reasonsData;
  }
  setReasons(obj: IReasons) {
    this._sessionStorageService.setItem(`reasons`, JSON.stringify(obj));
    this.reasonsData = this.getReasons();
  }
  removeReasons() {
    if (this._sessionStorageService.getItem(`reasons`)) {
      this._sessionStorageService.removeItem(`reasons`);
    }
    this.reasonsData = this.getReasons();
  }

  /** 
   * @desc Retorna los motivos, submotivos y condiciones
   */
  refreshReasons(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getReasons().pipe(take(1))
        .subscribe({
          next: (res: IReasons) => {
            // console.log(res);
            this.setReasons(res);
            resolve(true);
          },
          error: (err) => {
            console.log(err);
            reject(err);
          },
          complete: () => { console.log('complete'); }
        });
    });
  }

  getLogisticDetail(orderId: string): Promise<ILogisticDetail> {
    return new Promise((resolve, reject) => {
      this.returnHttp.getLogisticDetail(orderId).subscribe({
        next: (value) => {
          resolve(value);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }

}
