import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@shared/services/return/return.service';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOrderComplete } from '@shared/models/orders.model'

@Component({
  selector: 'app-step1-fo',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class step1FoComponent implements OnInit {

  visibleModal: boolean = false;
  dataClientForm!: FormGroup;
  stepId: string = 'fo-step1';
  step1Data!: { [key: string]: string };
  isRut: boolean = false;
  isPassport: boolean = false;

  constructor(
    public router: Router,
    public returnService: ReturnService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getLogisticDetail();
  }

  getLogisticDetail() {
    const data = this.returnService.getLocalOrderDetail('orderDetail')?.value as IOrderComplete;
    if (data) {
      this.returnService.getLogisticDetail(data.orderId).then(
        value => {
          if (Object.keys(value).length > 0) {
            this.returnService.setLocalData('logisticDetail', value);

            this.step1Data = {
              name: value.deliveryInformation.clientName,
              dni: value.deliveryInformation.clientDocument,
              email: value.deliveryInformation.clientEmail,
              typeDni: value.deliveryInformation.typeDocument,
            }
            this.isRut = (value.deliveryInformation.typeDocument === 'RUT');
            this.isPassport = (value.deliveryInformation.typeDocument !== 'RUT');
          } else {
            alert('¡Opss, ocurrio un error en el sistema!');
          }
        }, onrejected => {
          console.warn('reason');
          console.warn(onrejected);
        });
    } else {
      this.exitHome();
    }
  }

  nextStep(): void {
    this.returnService.setLocalData(this.stepId, this.step1Data);

    this.returnService.setNextStep('step2-fo');
    this.router.navigate(['/returns/step2-fo']);
  }


  exitHome() {
    this.router.navigate([`/home`]);
  }
}
