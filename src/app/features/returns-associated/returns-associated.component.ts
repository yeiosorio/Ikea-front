import { Component, HostListener, OnInit } from '@angular/core';
import { IOrderComplete } from '@shared/models/orders.model';
import { IReasons, IReverseStatus, ISubmotive } from '@shared/models/return.model';
import { ReturnService } from '@shared/services/return/return.service';
import { ControlsService } from '@shared/services/utils/controls/controls.service';

@Component({
  selector: 'app-returns-associated',
  templateUrl: './returns-associated.component.html',
  styleUrls: ['./returns-associated.component.scss']
})
export class ReturnsAssociatedComponent implements OnInit {

  visible: boolean = false;
  accIsOpen = [false, false];
  reverseList: any = [];
  reverseStatus = {} as IReverseStatus;
  requestQuantity: string = '';
  orderId: string = '';
  reasonsPromise!: Promise<boolean>;
  reasonsubmotiveConditions!: IReasons;
  returnOptionName: string = '';

  @HostListener('document:keydown', ['$event'])
  handleEscapeKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.visible = false
    }
  }
  constructor(
    public controlsService: ControlsService,
    public returnService: ReturnService,
  ) { }

  ngOnInit() {
    this.reverseOrderList();
    this.getReasons();
  }
  
  getReasons() {
    this.reasonsPromise = this.returnService.refreshReasons();
    this.reasonsPromise.then(( _bol: boolean) => {
      this.reasonsubmotiveConditions = this.returnService.getReasons();
    }).catch((error: any) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  closeDetail() {
    this.controlsService.setOpenDetail(false);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  reverseOrderList() {
    const data = this.returnService.getLocalOrderDetail('orderDetail')?.value as IOrderComplete;
    this.orderId = data.orderId;
    this.returnService.getLogisticDetail(data.orderId).then(
      value => {
        if (Object.keys(value).length > 0) {
          this.returnService.reverseOrderList(value.logisticOrderId).then(
            value => {
              this.reverseList = value;
              this.requestQuantity = value.length;
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

  getReverseStatus(reverseLogisticId: string) {
    this.returnService.getReverseStatus(reverseLogisticId).then(
      value => {
        if (Object.keys(value).length > 0) {
          this.reverseStatus = value;
          this.returnOptionName = this.reverseStatus.reverseLogisticOrderItems[0]?.returnOption?.type

          this.visible = true;
        }
      }, onrejected => {
        console.warn('reason');
        console.warn(onrejected);
      }
    );
  }

  motiveValue(mot: string): string {
    const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot);
    const textMotive = (reasons.length > 0) ? reasons[0].name : '';
    return textMotive;
  }
  // retorna el valor en texto del submotivo usando su codigo
  subMotiveValue(mot: string, submot: string): string {
    const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot);
    const subreasons = (reasons.length > 0) ? reasons[0].subReasons : [] as ISubmotive[];
    let textSubmotive = '';
    if (subreasons.length > 0) {
      textSubmotive = (subreasons.filter(submotive => submotive.code === submot))[0].name;
    }
    return textSubmotive;
  }

  goback() {
    javascript:history.back()
  }
  
}
