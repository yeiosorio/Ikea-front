import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@shared/services/return/return.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IReasons, IRLOCreate, ISubmotive, ReverseItem } from '@shared/models/return.model';

@Component({
  selector: 'app-step4-fo',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class step4FoComponent implements OnInit {
  visibleModal: boolean = false;
  CMRForm!: FormGroup;
  CMRView: boolean = true;
  visible: boolean = false;
  reverseLogisticOrderId: string = '';
  sessionDataSteps!: any;
  foStep2!: Array<{ [key: string]: any; }>;
  optionTab!: { [key: string]: any; };
  conditionName: string = '';

  // MOTIVOS, SUBMOTIVOS Y CONDICIONES
  reasonsubmotiveConditions!: IReasons;
  creatingReverse: boolean = false;
  address: string = '';
  logisticOrderId: string = '';

  constructor(
    public router: Router,
    public returnService: ReturnService,
    public formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.formGenerator();
    this.retrieveData('fo-CMRCode');
    this.reasonsubmotiveConditions = this.returnService.getReasons();
  }

  retrieveData(stepId: string): void {
    const data = this.returnService.getLocalData(stepId)
    if (data) {
      this.CMRForm.patchValue(data)
    }
  }

  formGenerator(): void {
    this.CMRForm = this.formBuilder.group({
      CMRCode: ['', [
        Validators.required,
      ]]
    });
  }

  nextStep() {
    this.returnService.setLocalData('fo-CMRCode', this.CMRForm.value);
    this.sessionDataSteps = {
      foStep1: this.returnService.getLocalData('fo-step1'),
      foStep3Address: this.returnService.getLocalData('fo-step3Address'),
      foAvailabilityDate: this.returnService.getLocalData('fo-availabilityDate'),
    }
    this.foStep2 = this.returnService.getLocalData('fo-step2');
    this.optionTab = this.returnService.getLocalData('fo-optionTab');
    const logisticDetail = this.returnService.getLocalData('logisticDetail');

    this.logisticOrderId = logisticDetail.logisticOrderId;
    this.address = this.sessionDataSteps.foStep3Address?.address;

    if (logisticDetail.deliveryInformation.code === 'COLLECT') {
      this.address = this.sessionDataSteps.foStep3Address.customerAddress + ' ' +
        this.sessionDataSteps.foStep3Address.customerNumber + ', ' +
        this.sessionDataSteps.foStep3Address.cityName + ', ' +
        this.sessionDataSteps.foStep3Address.regionName
    }
    this.CMRView = false;
  }

  verifiedAddress() {
    if (this.sessionDataSteps?.foStep3Address) {
      return this.sessionDataSteps?.foStep3Address.regionCode;
    }
  }

  reverseOrderCreate() {
    let returnOptions = {};
    let returnProducts = [] as ReverseItem[];
    this.creatingReverse = true;
    if (this.optionTab['optionHome']) {

      returnOptions = {
        type: 'HOME_PICKUP',
        reservationId: this.sessionDataSteps?.foAvailabilityDate.reservationId,
        logisticGroupId: this.sessionDataSteps?.foAvailabilityDate.logisticGroupId,
        logisticOptionId: this.sessionDataSteps?.foAvailabilityDate.logisticOptionId,
        pickupAddress: {
          addressLine1: this.address,
          addressLine2: '',
          addressLine3: '',
          politicalAreaId: this.sessionDataSteps?.foStep3Address.politicalAreaId,
          latitude: this.sessionDataSteps?.foStep3Address.geolocation.latitude,
          longitude: this.sessionDataSteps?.foStep3Address.geolocation.longitude
        },
        pickupInstructions: ''
      }
    } else {
      returnOptions = {
        type: 'DROP_OFF',
        nodeId: '',
        dropoffOperatorId: '',
        dropoffOperatorType: 'FALABELLA_GROUP',
        addressInfo: {
          addressLine1: this.sessionDataSteps?.foStep3Address.storeName,
          addressLine2: '',
          addressLine3: '',
          politicalAreaId: this.sessionDataSteps?.foStep3Address?.politicalAreaId,
          latitude: this.sessionDataSteps?.foStep3Address?.geolocation?.latitude,
          longitude: this.sessionDataSteps?.foStep3Address?.geolocation?.longitude
        }
      }
    }

    this.foStep2.map(value => {
      value['reasonsReturnList'].map((reasons: { [x: string]: any; }) => {
        returnProducts.push({
          sellerSkuId: value['sku'],
          sellerId: 'IKEA_CHILE',
          returnReason: {
            reasonCodeCategory: reasons['return'],
            reasonCodeSubCategory: reasons['submotive'],
            additionalDescription: ''
          },
          condition: [{
            conditionType: reasons['conditions'],
            conditionValue: this.conditionName
          }],
          unitPrice: {
            currency: 'CLP',
            centAmount: '0'
          },
          quantity: reasons['amount']
        })
      });
    });

    console.warn('returnProducts');
    console.log(returnOptions);

    const reverseOrderCreation = {
      logisticOrderId: this.logisticOrderId,
      crmId: this.CMRForm.value.CMRCode,
      sourceId: '8bd3424c-022a-cc89e2ac8cf0',
      returnOptions: [returnOptions],
      applicant: {
        userName: {
          firstName: this.sessionDataSteps?.foStep1?.name,
          middleName: '',
          lastName1: '',
          lastName2: ''
        },
        document: {
          id: this.sessionDataSteps?.foStep1?.dni,
          type: this.sessionDataSteps?.foStep1?.typeDni
        },
        email: {
          emailId: this.sessionDataSteps?.foStep1?.email
        }
      },
      reverseLogisticOrderItems: returnProducts
    } as IRLOCreate

    this.returnService.reverseOrderCreate(reverseOrderCreation).then(
      value => {
        if (value) {
          this.reverseLogisticOrderId = value.reverseLogisticOrderId
          this.visible = true;
          this.creatingReverse = false;
        }
      }, onrejected => {
        this.creatingReverse = false;
        console.warn('reason');
        console.warn(onrejected);
      }
    );

  }

  backStep(): void {
    this.returnService.setNextStep('step3-fo');
    this.router.navigate([`/returns/step3-fo`]);
  }

  redirectToStep2() {
    this.returnService.setNextStep('step2-fo');
    this.router.navigate([`/returns/step2-fo`]);
  }

  redirectToStep3() {
    this.returnService.setNextStep('step3-fo');
    this.router.navigate([`/returns/step3-fo`]);
  }

  redirectToStep4() {
    this.CMRView = true
  }

  modalClosed() {
    this.visible = false;
    this.router.navigate([`/home`]);
  }

  // retorna el valor en texto del motivo usando su codigo
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
  // retorna el valor en texto de la condicion usando su codigo
  conditionValue(cond: string): string {
    const conditions = this.reasonsubmotiveConditions.conditions.filter(condition => condition.code === cond);
    const textCondition = (conditions.length > 0) ? conditions[0].name : '';
    this.conditionName = textCondition;
    return textCondition;
  }

}
