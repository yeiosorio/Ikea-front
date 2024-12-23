import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderNotification } from '@shared/models/cancellation.model';
import { ICancelled, IOrderComplete } from '@shared/models/orders.model';
import { CancellationService } from '@shared/services/cancellation/cancellation.service';
import { OrderService } from '@shared/services/order/order.service';
import { LoadingService } from '@shared/services/utils/loading/loading.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss']
})
export class CancelledComponent implements OnInit {

  @Input() set visible(value: boolean){
    this.closedTotal();

    this.visibleCancelled = value;
  }
  get visible(): boolean{
    return this.visibleCancelled;
  }

  @Output() eventModalClosed = new EventEmitter();

  @Input() orderId: string = '';
  @Output() eventRefreshOrden = new EventEmitter();

  logisticCancelRequestId = '';
  notification!: boolean;

  loading = false;

  visibleCancelled = false;
  visibleNotificationApproved = false;
  visibleNotificationRejected = false;
  visiblePending = false;
  visibleError = false;

  constructor(
    private orderService: OrderService,
    public loadingService: LoadingService,
    private cancellationService: CancellationService
  ) { }

  ngOnInit(): void {
    console.log('<< CancelledComponent: ', this.notification);
  }

  setNotification(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.notification = (target.value === 'si')? true: false;
  }
  requestOrderCancellation(){
    this.loading = true;
    this.orderService.orderCancelled(this.orderId)
      .then((res: ICancelled) => {
        console.log('>>>>>> orderCancelled: '),
        this.logisticCancelRequestId = (res.logisticCancelRequestId.length > 0) ? res.logisticCancelRequestId: '';

        this.timerResponse();
        // this.loading = false;
      })
      .catch((error) => {
        this.closedTotal();
        this.openModalError();
        console.log('error orderCancelled: ', error);
        this.loading = false;
      });
  }

  notificationOrderCancellation(){
    this.closeModalNotificationApproved();
    this.closeModalNotificationRejected();
    this.closeModalPending();
    this.loadingService.open();

    console.log('notificationOrderCancellation: ', this.orderId,this.notification,this.logisticCancelRequestId);
    // this.orderService.orderLogisticCancelled(this.orderId,this.notification,this.logisticCancelRequestId)
    //   .then((_res: boolean) => {
    //     console.log('>>>>>> notificationOrderCancellation: ');
    //     this.loadingService.close();
    //     this.eventRefreshOrden.emit();
    //   })
    //   .catch((error) => {
    //     this.loadingService.close();
    //     console.log('error notificationOrderCancellation: ', error);
    //     this.eventRefreshOrden.emit();
    //   });

    this.cancellationService.patchOrderNotification(this.orderId, this.notification).pipe(take(1))
      .subscribe({
        next: (res: IOrderNotification)=> {
          console.log('patchOrderNotification: ', res);
          this.loadingService.close();
          this.eventRefreshOrden.emit();
        },
        error: (err) => {
          console.log(err);
          this.loadingService.close();
          this.eventRefreshOrden.emit();
        },
        complete: () => {console.log('complete');}
      });
  }




  validateOrder() {
    this.loading = true;
    this.orderService.getOrderService(this.orderId, true).then(
      (value: IOrderComplete) => {
        if (Object.keys(value).length > 0) {
          const order = value;
          if (order.cancellationState && order.cancellationState?.status) {
            const dat = order.cancellationState;
            switch (dat.status) {
              case 'REQUESTED':
                this.openModalPending();
              break;

              case 'PENDING':
                this.openModalPending();
              break;

              case 'APPROVED':
                this.openModalNotificationApproved();
              break;

              case 'REJECTED':
                this.openModalNotificationRejected();
              break;
            
              default:
                this.openModalPending();
                break;
            }

              this.closeModalCancelled();
            this.eventRefreshOrden.emit();
          }
        }else {
          this.openModalPending();
          this.closeModalCancelled();
        }
        this.loading = false;
      }, onrejected => {
        this.openModalPending();
        this.closeModalCancelled();
        this.loading = false;
        console.warn('reason');
        console.warn(onrejected);
    });
  }

  timerResponse(){
    setTimeout(() => {
      this.validateOrder();
    }, 20000);
  }

  openModalCancelled(){
    this.visibleCancelled = true;
  }
  closeModalCancelled(){
    this.visibleCancelled = false;
  }

  openModalNotificationApproved(){
    this.visibleNotificationApproved = true;
  }
  closeModalNotificationApproved(){
    this.visibleNotificationApproved = false;
  }

  openModalNotificationRejected(){
    this.visibleNotificationRejected = true;
  }
  closeModalNotificationRejected(){
    this.visibleNotificationRejected = false;
  }

  openModalPending(){
    this.visiblePending = true;
  }
  closeModalPending(){
    this.visiblePending = false;
  }

  openModalError(){
    this.visibleError = true;
  }
  closeModalError(){
    this.visibleError = false;
  }

  closedTotal(){
    this.closeModalCancelled();
    this.closeModalNotificationApproved();
    this.closeModalNotificationRejected();
    this.closeModalPending();
    this.closeModalError();
  }

  finishCancelled() {
    this.closedTotal();

    this.eventModalClosed.emit();
  }
}
