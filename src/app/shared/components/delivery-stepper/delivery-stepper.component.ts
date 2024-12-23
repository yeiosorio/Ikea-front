import { Component, Input } from '@angular/core';
import { IState, IDeliveryInformation, IProduct } from '@shared/models/orders.model';

@Component({
  selector: 'app-delivery-stepper',
  templateUrl: './delivery-stepper.component.html',
  styleUrls: ['./delivery-stepper.component.scss']
})
export class DeliveryStepperComponent {

  items?: IProduct[];
  @Input() currentState?: IState;
  @Input() previousStates?: IState[] = []
  @Input() deliveryInformation?: IDeliveryInformation
  @Input() set infoStatus(value: IState | undefined) {
    this.currentState = value;
    this.setStatusStyle();
  }
  @Input() set orderItems(value: IProduct[] | undefined) {
    this.items = value;
    this.checkAnulledItems();
  }
  confirmStage: String = 'pendingDelivery'
  processStage: String = 'pendingDelivery'
  shippingStage: String = 'pendingDelivery'
  collectStage: String = 'pendingDelivery'
  finalStage: String = 'pendingDelivery'
  labelState: String = 'Entregado'
  checkmark: boolean = true;
  box_cancel: boolean = false;
  pending_clock: boolean = false;

  constructor() {
  }

  setStatusStyle() {
    switch (this.currentState?.code) {
      case 'CONFIRMED':
        this.confirmStage = 'currentDelivery'
        if (this.currentState?.delay) {
          this.confirmStage = 'delayDelivery'
        }
        break;
      case 'IN_PROCESS':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'currentDelivery'
        if (this.currentState?.delay) {
          this.processStage = 'delayDelivery'
        }
        break;
      case 'IN_TRANSIT':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'currentDelivery'
        if (this.currentState?.delay) {
          this.shippingStage = 'delayDelivery'
        }
        break;
      case 'READY_FOR_PICKUP':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'pastDelivery'
        this.collectStage = 'currentDelivery'
        if (this.currentState?.delay) {
          this.collectStage = 'delayDelivery'
        }
        break;
      case 'DELIVERED':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'pastDelivery'
        this.collectStage = 'pastDelivery'
        this.finalStage = 'successDelivery'
        this.labelState = 'Entregado'
        break;
      case 'DELIVERY_FAILED':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'pastDelivery'
        this.collectStage = 'pastDelivery'
        this.finalStage = 'failedDelivery'
        this.labelState = 'Entrega fallida'
        break;
      case 'CANCELLED':
        this.confirmStage = 'pastDelivery'
        this.finalStage = 'failedDelivery'
        this.labelState = 'Cancelado'
        break;
      case 'CANCELLATION_PENDING':
        this.confirmStage = 'pastDelivery'
        this.finalStage = 'delayDelivery'
        this.labelState = 'Cancelación pendiente'
        break;
      case 'ANNULLED':
        this.confirmStage = 'pastDelivery'
        this.finalStage = 'failedDelivery'
        this.labelState = 'Cancelado'
        break;
      case 'DELIVERY_PENDING':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'pastDelivery'
        this.collectStage = 'pastDelivery'
        this.finalStage = 'delayDelivery'
        this.labelState = 'Entrega pendiente'
        this.pending_clock = true;
        this.checkmark = false;
        break;
      case 'PARTIAL_DELIVERY':
        this.confirmStage = 'pastDelivery'
        this.processStage = 'pastDelivery'
        this.shippingStage = 'pastDelivery'
        this.collectStage = 'pastDelivery'
        this.finalStage = 'delayDelivery'
        this.labelState = 'Entrega parcial'
        this.pending_clock = true;
        this.checkmark = false;
        break;
    }

    if (this.currentState?.code === 'DELIVERY_FAILED' ||
      this.currentState?.code === 'CANCELLED' ||
      this.currentState?.code === 'CANCELLATION_PENDING') {
      this.box_cancel = true;
      this.checkmark = false;
    }
  }

  getStepDates(pos: number, status: string): string | undefined {
    if (status === 'IN_PROCESS') {
      if (this.currentState?.code !== status && this.currentState?.code !== 'CONFIRMED') {
        return (this.previousStates?.[pos]?.date) ? this.previousStates?.[pos]?.date : this.currentState?.date
      } else if (this.currentState?.code == status) {
        return this.currentState?.date
      }
    }
    if (status === 'IN_TRANSIT' || status === 'READY_FOR_PICKUP') {
      if (this.currentState?.code !== status &&
        this.currentState?.code !== 'CONFIRMED' &&
        this.currentState?.code !== 'IN_PROCESS'
      ) {
        return (this.previousStates?.[pos]?.date) ? this.previousStates?.[pos]?.date : this.currentState?.date
      } else if (this.currentState?.code == status) {
        return this.currentState?.date
      }
    }
    return;
  }

  checkAnulledItems() {
    if (!this.items?.every((item) => item?.statusCode !== 'ANNULLED')) {
      switch (this.currentState?.code) {
        case 'IN_PROCESS':
          this.processStage = 'delayDelivery'
          break;
        case 'IN_TRANSIT':
          this.shippingStage = 'delayDelivery'
          break;
        case 'READY_FOR_PICKUP':
          this.collectStage = 'delayDelivery'
          break;
      }
    }
  }

}
