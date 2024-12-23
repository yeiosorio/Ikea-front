import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrderCancel, OrderCancelGetDefaultModel } from '@shared/models/cancellation.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public copyOrderCancel: IOrderCancel = new OrderCancelGetDefaultModel();
  @Input() set orderCancel(value: IOrderCancel){
    if (value.deliveryInformation) {
      console.log('valueee: ', value);
      this.copyOrderCancel = value;
      this.skInlineMessageRefresh(this.copyOrderCancel);
      this.initNotify();
    }
  }
  get orderCancel(): IOrderCancel{
    return this.copyOrderCancel;
  }

  @Input() openDetailOrden = false;
  @Output() closeViewEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter<string>();

  // <app-sk-inline-message>
  skMessageType = 'informative';
  skMessageTitle = '';
  skMessageDescription = '';

  loadingOrder = false;

  okUpdateMessage = false;
  errorUpdateMessage = false;

  // Notify
  visibleNotify = false;
  notify = false;
  btnNoNotify = '';
  btnNotify = '';
  btnSave = false;
  
  constructor() { }

  ngOnInit(): void {
    console.log();
  }

  // FIX: Corregir los estados de cancelacion
  skInlineMessageRefresh(data: IOrderCancel){
    // informative-cautionary-negative-positive
    const dat = data.cancellationState;
    switch (dat.status) {
      case 'REQUESTED':
        this.skMessageType = 'informative';
        this.skMessageTitle = 'Cancelación solicitada';
        this.skMessageDescription = dat.message;

        this.visibleNotify = false;
      break;

      case 'PENDING':
        this.skMessageType = 'cautionary';
        this.skMessageTitle = 'Cancelación pendiente';
        this.skMessageDescription = dat.message;

        this.visibleNotify = false;
      break;

      case 'APPROVED':
        this.skMessageType = 'positive';
        this.skMessageTitle = 'Cancelación aprobada';
        this.skMessageDescription = dat.message;

        this.visibleNotify = true;
      break;

      case 'REJECTED':
        this.skMessageType = 'negative';
        this.skMessageTitle = 'Cancelación rechazada';
        this.skMessageDescription = dat.message;

        this.visibleNotify = true;
      break;
    
      default:
        this.skMessageType = 'informative';
        this.skMessageTitle = 'Cancelación sim imformación';
        this.skMessageDescription = '';

        this.visibleNotify = false;
        break;
    }
  }

  initNotify(){
    if(this.notify){
      this.btnNoNotify = 'disabled-option';
      this.btnNotify = 'active-option';
      this.btnSave = false;
    } else{
      this.btnNoNotify = 'active-option';
      this.btnNotify = '';
      this.btnSave = false;
    }
  }
  clickBtnNoNotify(){
    if (this.btnNoNotify === '') {
      this.btnNoNotify = 'active-option';
      this.btnNotify = '';
      this.btnSave = false;
    }
  }
  clickBtnNotify(){
    if (this.btnNotify === '') {
      this.btnNoNotify = '';
      this.btnNotify = 'active-option';
      this.btnSave = true;
    }
  }

  saveNotify(id: string){
    this.saveEvent.emit(id);
  }

  closeDetail(){
    this.closeViewEvent.emit();
  }

  stopPropagation(e:Event) {
    e.stopPropagation();
  }

}
