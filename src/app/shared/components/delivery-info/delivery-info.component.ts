import { Component, Input } from '@angular/core';
import { IDeliveryInformation, IState, IProduct } from '@shared/models/orders.model';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.scss']
})
export class DeliveryInfoComponent {

  public currentState?: IState;
  items?: IProduct[];
  statusColor: String = '';
  pendingText: String = '';

  @Input() deliveryInformation?: IDeliveryInformation;
  @Input() purchaseDate?: String = '';
  @Input() set infoStatus(value: IState | undefined) {
    this.currentState = value;
    this.setStatusColor();
  }
  @Input() set orderItems(value: IProduct[] | undefined) {
    this.items = value;
    this.checkAnulledItems();
  }

  constructor() {
  }

  setStatusColor() {
    if ((this.currentState?.code === 'CONFIRMED' ||
      this.currentState?.code === 'IN_PROCESS' ||
      this.currentState?.code === 'IN_TRANSIT' ||
      this.currentState?.code === 'READY_FOR_PICKUP') &&
      !this.currentState?.delay
    ) {
      this.statusColor = 'status-current-bg'
    } else if (
      this.currentState?.code !== 'DELIVERY_FAILED' &&
      this.currentState?.code !== 'CANCELLED' &&
      this.currentState?.code !== 'DELIVERED' &&
      this.currentState?.code !== 'ANNULLED'
      && this.currentState?.delay
    ) {
      this.statusColor = 'status-delay-bg'
      this.pendingText = 'pending-text'
    } else if (this.currentState?.code === 'DELIVERED') {
      this.statusColor = 'status-success-bg'
    } else if (
      this.currentState?.code === 'DELIVERY_FAILED' ||
      this.currentState?.code === 'CANCELLED' ||
      this.currentState?.code === 'ANNULLED'
    ) {
      this.statusColor = 'status-reject-bg'
    } else if (this.currentState?.code === 'DELIVERY_PENDING'
      || this.currentState?.code === 'CANCELLATION_PENDING'
      || this.currentState?.code === 'PARTIAL_DELIVERY'
    ) {
      this.statusColor = 'status-delay-bg';
      this.pendingText = 'pending-text'
    }

  }

  checkAnulledItems() {
    
    if (this.items?.every((item) => item?.statusCode !== 'ANNULLED') === false &&
    (this.currentState?.code !== 'DELIVERY_FAILED' &&
    this.currentState?.code !== 'CANCELLED' &&
    this.currentState?.code !== 'ANNULLED')
    ) {
      this.statusColor = 'status-delay-bg';
      this.pendingText = 'pending-text'
    }
  }

}
