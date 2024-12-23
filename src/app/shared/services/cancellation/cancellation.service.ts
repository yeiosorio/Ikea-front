import { Injectable } from '@angular/core';
import { IFiltersCancel, IOrderCancel, IOrderNotification } from '@shared/models/cancellation.model';
import { CancellationHttp } from '@shared/services/http/cancellation.http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancellationService {

  constructor(
    private cancellationHttp: CancellationHttp
  ) { }

  getOrderCancel(filters: IFiltersCancel): Observable<IOrderCancel[]> {
    return this.cancellationHttp.getOrderCancel(filters);
  }

  patchOrderNotification(id: string, notification: boolean): Observable<IOrderNotification> {
    return this.cancellationHttp.patchtOrderNotification(id, notification);
  }
}
