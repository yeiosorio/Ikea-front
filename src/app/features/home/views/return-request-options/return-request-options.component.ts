import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '@shared/services/order/order.service';

@Component({
  selector: 'app-return-request-options',
  templateUrl: './return-request-options.component.html',
  styleUrls: ['./return-request-options.component.scss']
})
export class ReturnRequestOptionsComponent implements OnInit, AfterViewChecked {

  visible: boolean = false;
  typed: boolean = false;
  invalid: boolean = false;
  orderNotFoundMsg: boolean = false;
  disableButton: boolean | null = true;
  orderForm!: FormGroup;
  onFocus: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleEscapeKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'Escape'){
      this.visible = false;
    }
  }

  @ViewChild('orderSearch') orderSearch: ElementRef | undefined;

  constructor(
    public router: Router,
    private orderService: OrderService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGenerator();
  }

  ngAfterViewChecked() {
    if (!this.onFocus && this.visible) {
      this.orderSearch?.nativeElement.focus();
      this.onFocus = true;
    }
  }

  formGenerator(): void {
    this.orderForm = this.formBuilder.group({
      orderId: ['', []]
    });
  }
  
  autofocus() {
    setTimeout(() => {
      this.orderSearch?.nativeElement.focus();
    }, 200);
  }

  addInput(): void {
    this.disableButton = true;
    const orderId = this.orderForm.get('orderId')?.value.toUpperCase();

    if (orderId?.length < 10)
      this.invalid = true

    if (!this.invalid && orderId !== '') {
      this.orderService.getOrderService(orderId).then(
        value => {
          this.disableButton = null;
          if (Object.keys(value).length > 0) {
            this.router.navigate([`/follow-up/resumen/${orderId}`]);
          }else {
            this.orderNotFoundMsg = true;
          }
        }, onrejected => {
          console.warn('reason');
          console.warn(onrejected);
          this.orderNotFoundMsg = true;
          this.disableButton = null;
        });
    }
  }

  isValid(): void {
    const orderId = this.orderForm.get('orderId')?.value
    this.typed = (orderId !== '') ? true : false;
    if (orderId?.length < 10 || orderId?.length > 10 )
      this.invalid = true;
    this.orderNotFoundMsg = false;
  }
  
  ableButton(): void {
    this.orderNotFoundMsg = false;

    const orderId = this.orderForm.get('orderId')?.value.replace(/[^\w\s]/gi, ''); 
    this.orderForm.get('orderId')?.setValue(orderId)

    if (orderId?.length >= 10 && orderId?.length <= 10) {
      this.disableButton = null;
      this.invalid = false;
    } else {
      this.disableButton = true;
    }

    if (orderId?.length > 10)
      this.invalid = true;
  }

}
