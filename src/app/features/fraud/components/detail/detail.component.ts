import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderFraud, OrderFraudGetDefaultModel } from '@shared/models/fraud.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public copyOrderCancel: IOrderFraud = new OrderFraudGetDefaultModel();
  @Input() set orderCancel(value: IOrderFraud){
    if (value.merchantId) {
      this.copyOrderCancel = value;
      this.skInlineMessageRefresh(this.copyOrderCancel);
      // this.initNotify();
      this.btnSave = false;
    }
  }
  get orderCancel(): IOrderFraud{
    return this.copyOrderCancel;
  }

  @Input() openDetailOrden = false;
  @Output() closeViewEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<{id: string, selectStatus:string}>();

  // <app-sk-inline-message>

  loadingOrder = false;

  okUpdateMessage = false;
  errorUpdateMessage = false;

  // Notify
  visibleStatus = false;
  // notify = false;
  btnOption01 = '';
  btnOption02 = '';
  btnSave = false;
  selectStatus = '';
  
  constructor() { }

  ngOnInit(): void {
    console.log();
  }

  skInlineMessageRefresh(data: IOrderFraud){
    const dat = data.statusCode;
    switch (dat) {
      case 'REJECTED':
        this.visibleStatus = true;
      break;

      case 'ORDER_CANCELLED':
        this.visibleStatus = false;
      break;

      case 'ASSUMED':
        this.visibleStatus = false;
      break;
    
      default:
        this.visibleStatus = false;
        break;
    }
  }

  clickBtnOption01(){
    if (this.btnOption01 === '') {
      this.btnOption01 = 'active-option';
      this.btnOption02 = '';
      this.btnSave = true;
      this.selectStatus = 'ASSUMED';
    }
  }
  clickBtnOption02(){
    if (this.btnOption02 === '') {
      this.btnOption01 = '';
      this.btnOption02 = 'active-option';
      this.btnSave = true;
      this.selectStatus = 'ORDER_CANCELLED';
    }
  }

  saveStatus(id: string){
    this.saveEvent.emit({id: id, selectStatus: this.selectStatus});
  }

  closeDetail(){
    this.closeViewEvent.emit();
  }

  stopPropagation(e:Event) {
    e.stopPropagation();
  }

}
