import { Component, HostListener, Input } from '@angular/core';
import { ControlsService } from '@shared/services/utils/controls/controls.service';
import { IPackage, IOrderItemsAnnulled } from '@shared/models/orders.model';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  @HostListener('document:keydown', ['$event'])
  handleEscapeKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDetail();
    }
  }

  serviceId = '';
  selectValue = '';
  itemsTotal: number = 0
  accIsOpen: [boolean] = [false];
  accIsOpenItem: [boolean] = [false];

  packagesOrder: IPackage[] = [];
  @Input() set packages(value: IPackage[]) {
    this.packagesOrder = value;
    this.countItems();
  }
  @Input() alertMessages: any;
  @Input() orderId: string = '';

  @Input() itemsAnulled: IOrderItemsAnnulled[] = [] as IOrderItemsAnnulled[];

  constructor(public controlsService: ControlsService) {
    
  }

  closeDetail() {
    this.controlsService.setOpenDetail(false);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  getPartialDeliveryMessage(alertCode: string): string {
    
    return this.alertMessages?.filter(
      (messageVal: { code: string; }) =>
        alertCode === messageVal.code
    )[0]?.message;

  }

  countItems () {
    this.packagesOrder?.forEach((_val, i) => {
      _val.products?.forEach((product, i) => {
        this.itemsTotal += product.quantity;
      })
    })
  }

}