import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IReasons, IReverseStatus, ISubmotive } from '@shared/models/return.model';
import { OrderService } from '@shared/services/order/order.service';
import { ReturnService } from '@shared/services/return/return.service';

@Component({
  selector: 'app-no-fo-option',
  templateUrl: './no-fo-option.component.html',
  styleUrls: ['./no-fo-option.component.scss']
})
export class NoFoOptionComponent implements OnInit, AfterViewChecked {

  visible: boolean = false;
  visible2: boolean = false;
  typed: boolean = false;
  invalid: boolean = false;
  orderNotFoundMsg: boolean = false;
  disableButton: boolean | null = null;
  orderForm!: FormGroup;
  onFocus: boolean = false;
  accIsOpen = [false, false];
  reverseStatus!: IReverseStatus;
  sessionReturnFO: string[] = ['fo-step1', 'fo-step2', 'fo-step3Address', 'fo-availabilityDate', 'optionTab', 'reasons', 'fo-CMRCode', 'logisticDetail'];
  sessionReturn: string[] = ['step1', 'step2', 'step3Address', 'availabilityDate', 'optionTab', 'reasons', 'CMRCode', 'logisticDetail'];
  reasonsPromise!: Promise<boolean>;
  reasonsubmotiveConditions!: IReasons;
  returnOptionName: string = '';
  
  constructor(
    public router: Router,
    private orderService: OrderService,
    public formBuilder: FormBuilder,
    public returnService: ReturnService,
  ) { }

  @ViewChild('orderSearch') orderSearch: ElementRef | undefined;

  @HostListener('document:keydown', ['$event'])
  handleEscapeKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.visible = false
    }
  }

  ngOnInit(): void {
    this.formGenerator();
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

  ngAfterViewChecked() {
    if (!this.onFocus && this.visible) {
      this.orderSearch?.nativeElement.focus();
      this.onFocus = true;
    }
  }

  formGenerator(): void {
    this.orderForm = this.formBuilder.group({
      reverseLogisticId: ['', []]
    });
  }

  autofocus() {
    setTimeout(() => {
      this.orderSearch?.nativeElement.focus();
    }, 200);
  }

  getReverseStatus() {
    this.orderNotFoundMsg = false;
    const reverseLogisticId = this.orderForm.get('reverseLogisticId')?.value.toUpperCase();
    this.returnService.getReverseStatus(reverseLogisticId).then(
      value => {
        if (value.reverseLogisticOrderId) {
          this.reverseStatus = value;
          this.returnOptionName = this.reverseStatus.reverseLogisticOrderItems[0]?.returnOption?.type
          this.visible = false
          this.visible2 = true
        } else {
          this.orderNotFoundMsg = true;
        }
      }, onrejected => {
        this.orderNotFoundMsg = true;
        console.warn('reason');
        console.warn(onrejected);
      }
    );
  }

  isValid(): void {
    const reverseLogisticId = this.orderForm.get('reverseLogisticId')?.value
    this.typed = (reverseLogisticId !== '') ? true : false;
    if (reverseLogisticId?.length < 10 || reverseLogisticId?.length > 10)
      this.invalid = true;
    this.orderNotFoundMsg = false;
  }

  clearAllSession() {
    /* Clear all sessionStorage about [returns] */
    this.sessionReturn.map(val => {
      this.returnService.removeLocalData(val);
    });
    this.sessionReturnFO.map(val => {
      this.returnService.removeLocalData(val);
    });
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

}
