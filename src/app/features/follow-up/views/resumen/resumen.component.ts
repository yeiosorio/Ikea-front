import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ControlsService } from '@shared/services/utils/controls/controls.service';
import { OrderService } from '@shared/services/order/order.service';
import { ReturnService } from '@shared/services/return/return.service';
import { IOrderComplete } from '@shared/models/orders.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@shared/services/utils/loading/loading.service';
import { AngularFireRemoteConfig, mapToObject } from '@angular/fire/compat/remote-config';
import * as moment from 'moment';
import { trace } from '@angular/fire/compat/performance';
import { Observable } from 'rxjs';
import { IMotive, IReasons, ISubmotive } from '@shared/models/return.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
  animations: [
    trigger('animationShowHide', [
      state('close', style({ height: '0px' })),
      state('open', style({ height: '*' })),
      transition('open <=> close', animate('350ms cubic-bezier(0.4, 0.0, 0.4, 1.0)')),
    ])
  ],
})
export class ResumenComponent implements OnInit {

  visible01: boolean = false;
  // visible: boolean = false;
  active: boolean = false;
  tooltip: boolean = false;
  tooltipAmount: boolean = false;
  message: boolean = false;
  hasPackages: boolean = false;
  messageReason: string = '';
  order: IOrderComplete = {} as IOrderComplete;
  sessionReturnFO: string[] = ['fo-step1', 'fo-step2', 'fo-step3Address', 'fo-availabilityDate', 'fo-optionTab', 'reasons', 'fo-CMRCode', 'logisticDetail'];
  sessionReturn: string[] = ['step1', 'step2', 'step3Address', 'availabilityDate', 'optionTab', 'reasons', 'CMRCode', 'logisticDetail'];
  timingList: string[] = [];
  readonly change$: Observable<any>;
  hasReturn: boolean = false;
  alertIcon: string = '';
  cancellationStatus: string = '';
  notified: boolean = false;
  reasonAlert: boolean = false;
  amountTotal: number = 0;
  reasonsPromise!: Promise<boolean>;
  reasonsubmotiveConditions: IReasons = {} as IReasons;

  expandMotive = 'close';
  alertMessages: any;

  constructor(
    private controlsService: ControlsService,
    private orderService: OrderService,
    public loadingService: LoadingService,
    private route: ActivatedRoute,
    public router: Router,
    public readonly remoteConfig: AngularFireRemoteConfig,
    public returnService: ReturnService,
  ) {
    this.change$ = remoteConfig.parameters.pipe(trace('remote-config'), mapToObject({}));
  }

  ngOnInit(): void {
    this.reverseOrderList();
    this.getOrderData(true);
    this.getReasons();

  }

  getReasons() {
    this.reasonsPromise = this.returnService.refreshReasons();
    this.reasonsPromise.then((_bol: boolean) => {
      this.reasonsubmotiveConditions = this.returnService.getReasons();
    }).catch((error: any) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  reverseOrderList() {
    const orderId = this.route?.snapshot.params['nroOrden'];
    this.returnService.getLogisticDetail(orderId).then(
      value => {
        if (Object.keys(value).length > 0) {
          this.returnService.reverseOrderList(value.logisticOrderId).then(
            value => {
              if (Object.keys(value).length > 0) {
                this.hasReturn = true;
              }
            }, onrejected => {
              console.warn('reason');
              console.warn(onrejected);
            }
          );
        }
      }, onrejected => {
        console.warn('reason');
        console.warn(onrejected);
      });
  }

  getOrderData(refresh: boolean = true) {
    const orderId = this.route?.snapshot.params['nroOrden'];
    this.orderService.getOrderService(orderId, refresh).then(
      (value: IOrderComplete) => {
        if (Object.keys(value).length > 0) {

          this.order = value;
          this.cancellationStatus = value.cancellationState?.status;
          this.notified = value.cancellationState?.notified;

          this.change$.subscribe(val => {
            if (Object.keys(val).length > 0) {
              this.alertMessages = JSON.parse(val.alertMessages);
              this.messageReason = this.alertMessages.filter(
                (messageVal: { code: string; }) =>
                  this.order.deliveryInformation?.alertMsgCode === messageVal.code
              )[0]?.message
              console.log(this.order.deliveryInformation?.alertMsgCode);
              console.log(this.messageReason);

              this.messageReason = this.messageReason?.replace('{{attempts}}', this.order.deliveryInformation?.attempts);
            }
          });
          this.hasPackages = (this.order.packages.length > 0)

          this.order.currentState.date =
            this.order.currentState?.date ? moment(this.order.currentState?.date).format('DD/MM/YYYY') : '-';

          this.order.purchaseDate =
            this.order?.purchaseDate ? moment(this.order?.purchaseDate).format('DD/MM/YYYY') : '-';

          this.order.deliveryInformation.date =
            this.order.deliveryInformation?.date ? moment(this.order.deliveryInformation?.date).format('DD/MM/YYYY') : '-';

          if (this.order.deliveryInformation.promisedDate) {
            this.order.deliveryInformation.promisedDate.dateFrom = moment(this.order.deliveryInformation?.promisedDate.dateFrom).format('DD/MM/YYYY')
            this.order.deliveryInformation.promisedDate.dateTo = moment(this.order.deliveryInformation?.promisedDate.dateTo).format('DD/MM/YYYY')
          }

          this.order.previousStates?.forEach((_val, i) => {
            this.order.previousStates[i].date =
              this.order.previousStates[i].date ? moment(this.order.previousStates[i].date).format('DD/MM/YYYY') : '-';
          })
          
          this.order.orderItems?.forEach((_val, i) => {
            this.amountTotal += _val.quantity;
          })

        } else {
          this.router.navigate([`/home`]);
        }
      }, onrejected => {
        this.router.navigate([`/home`]);
        console.warn('reason');
        console.warn(onrejected);
      });
  }

  formatTiming() {
    return this.order.deliveryInformation.store?.storeTiming?.split(' ');
  }

  setAlertColor() {
    if (this.order?.cancellationState?.status === 'APPROVED' && this.order?.cancellationState?.notified) {
      return 'inline-message--positive';
    }
    if (this.order?.cancellationState?.status === 'APPROVED' && !this.order?.cancellationState?.notified) {
      return 'inline-message--cautionary';
    }
    if (this.order?.cancellationState?.status === 'REJECTED') {
      return 'inline-message--negative';
    }
    return;
  }

  motiveValue(mot: string = ''): string {
    let textMotive = '';
    if (typeof (this.reasonsubmotiveConditions.reasons) !== 'undefined') {
      const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot) as IMotive[];
      textMotive = (reasons.length > 0) ? reasons[0].name : '';
    }
    return textMotive;
  }
  // retorna el valor en texto del submotivo usando su codigo
  subMotiveValue(mot: string = '', submot: string = ''): string {
    let textSubmotive = '';
    if (typeof (this.reasonsubmotiveConditions.reasons) !== 'undefined') {
      const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot) as IMotive[];
      const subreasons = (reasons.length > 0) ? reasons[0].subReasons : [] as ISubmotive[];
      if (subreasons.length > 0) {
        textSubmotive = (subreasons.filter(submotive => submotive.code === submot))[0].name;
      }
    }
    return textSubmotive;
  }

  onClickDetail() {
    this.controlsService.setOpenDetail(true);
  }

  goToReturns() {
    /* Clear all sessionStorage about [returns] */
    this.sessionReturn.map(val => {
      this.returnService.removeLocalData(val);
    });
    this.sessionReturnFO.map(val => {
      this.returnService.removeLocalData(val);
    });

    this.orderService.shareDataReturns(this.order)
    this.router.navigate([`/returns/step1-fo`]);
  }

  goToReturnsAssociated() {
    this.router.navigate([`/returns-associated`]);
  }

  refreshOrden() {
    this.getOrderData();
  }

  // forzar la carga, con el consumo del endpoint
  refreshForceOrden() {
    this.getOrderData(true);
  }

  openModalCancelled() {
    this.visible01 = true;
  }
  closeModalCancelled() {
    this.visible01 = false;
  }
}
