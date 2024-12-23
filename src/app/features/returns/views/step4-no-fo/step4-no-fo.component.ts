import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@shared/services/return/return.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IReasons, IRLOCreate, ISubmotive, ReverseItem } from '@shared/models/return.model';

@Component({
  selector: 'app-step4-no-fo',
  templateUrl: './step4-no-fo.component.html',
  styleUrls: ['./step4-no-fo.component.scss']
})
export class Step4NoFoComponent implements OnInit {
  visibleModal: boolean = false;
  CMRForm!: FormGroup;
  CMRView: boolean = true;
  visible: boolean = false;
  creatingReverse: boolean = false;
  sessionDataSteps!: any;
  reverseLogisticOrderId: string = '';
  step2!: Array<{ [key: string]: any; }>;
  optionTab!: { [key: string]: any; };

  // MOTIVOS, SUBMOTIVOS Y CONDICIONES
  reasonsubmotiveConditions!: IReasons;
  conditionName: string = '';
  
  constructor(
    public router: Router,
    public returnService: ReturnService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGenerator();
    this.retrieveData('CMRCode');
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
    this.returnService.setLocalData('CMRCode', this.CMRForm.value);

    this.sessionDataSteps = {
      step1: this.returnService.getLocalData('step1'),
      step3Address: this.returnService.getLocalData('step3Address'),
      availabilityDate: this.returnService.getLocalData('availabilityDate'),
    }
    this.step2 = this.returnService.getLocalData('step2');
    this.optionTab = this.returnService.getLocalData('optionTab');
    this.CMRView = false;
  }

  verifiedAddress() {
    if (this.sessionDataSteps.step3Address) {
      return this.sessionDataSteps.step3Address.regionCode;
    }
  }

  reverseOrderCreate() {
    let returnOptions = {};
    let returnProducts = [] as ReverseItem[];
    this.creatingReverse = true;
    if (this.optionTab['optionHome']) {
      const address =  this.sessionDataSteps.step3Address.customerAddress +' '+ this.sessionDataSteps.step3Address.customerNumber
      returnOptions = {
        type: 'HOME_PICKUP',
        reservationId: this.sessionDataSteps.availabilityDate.reservationId,
        logisticGroupId: this.sessionDataSteps.availabilityDate.logisticGroupId,
        logisticOptionId: this.sessionDataSteps.availabilityDate.logisticOptionId,
        pickupAddress: {
          addressLine1: address,
          addressLine2: '',
          addressLine3: '',
          politicalAreaId: this.sessionDataSteps?.step3Address.city,
          latitude: this.sessionDataSteps?.step3Address?.geolocation ? this.sessionDataSteps?.step3Address.geolocation.latitude : 0,
          longitude: this.sessionDataSteps?.step3Address?.geolocation ? this.sessionDataSteps?.step3Address.geolocation.longitude : 0,
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
          addressLine1: this.sessionDataSteps.step3Address.storeName,
          addressLine2: '',
          addressLine3: '',
          politicalAreaId: this.sessionDataSteps.step3Address.cityCode,
          latitude: this.sessionDataSteps.step3Address.geolocation.latitude,
          longitude: this.sessionDataSteps.step3Address.geolocation.longitude
        }
      }
    }

    this.step2.map(value => {
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
    console.log(returnProducts);
    
    const reverseOrderCreation = {
      logisticOrderId: '',
      crmId: this.CMRForm.value.CMRCode,
      sourceId: '8bd3424c-022a-cc89e2ac8cf0',
      returnOptions: [returnOptions],
      applicant: {
        userName: {
          firstName: this.sessionDataSteps.step1.name,
          middleName: '',
          lastName1: '',
          lastName2: ''
        },
        document: {
          id: this.sessionDataSteps.step1.rut,
          type: this.sessionDataSteps.step1.typeDni
        },
        email: {
          emailId: this.sessionDataSteps.step1.email
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
    this.returnService.setNextStep('step3-no-fo');
    this.router.navigate([`/returns/step3-no-fo`]);
  }

  redirectToStep1() {
    this.returnService.setNextStep('step1-no-fo');
    this.router.navigate([`/returns/step1-no-fo`]);
  }

  redirectToStep2() {
    this.returnService.setNextStep('step2-no-fo');
    this.router.navigate([`/returns/step2-no-fo`]);
  }

  redirectToStep3() {
    this.returnService.setNextStep('step3-no-fo');
    this.router.navigate([`/returns/step3-no-fo`]);
  }
  redirectToStep4() {
    this.CMRView = true
  }

  modalClosed(){
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
