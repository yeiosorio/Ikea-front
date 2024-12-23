import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from '@shared/models/messages.model';
import { IOrderComplete, IPackage, IProduct } from '@shared/models/orders.model';
import { ILogisticDetail, IPackageLogistic, IProductLogistic, IProductsReturn, IReasons, IReasonsReturn, ISubmotive } from '@shared/models/return.model';
import { OrderService } from '@shared/services/order/order.service';
import { ReturnService } from '@shared/services/return/return.service';
import { Observable, share } from 'rxjs';

@Component({
  selector: 'app-step2-fo',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class step2FoComponent implements OnInit {
  visibleModal: boolean = false;
  // LEO *********************************************
  // Observador del detalle de la orden
  // oderDetailPromise!: Promise<IOrderComplete>;
  logisticDetail: ILogisticDetail = this.returnService.getLocalData('logisticDetail');
  stepId: string = 'fo-step2';

  // Inicializa formulario e listado de productos
  returnProductsform: FormGroup = this.formB.group({
    checkProductsGlobal: [false, []],
    returnProductList: this.formB.array([])
  });
  returnProductList: FormArray = this.returnProductsform.get('returnProductList') as FormArray;

  returnProducts21!: IProductsReturn[];

  // MODAL VISIBLE
  visible01: boolean = false;
  skuDelete: string = '';

  // Mensajes informativos en pantalla
  listMessage = {
    'message-empty': {
      center: true,
      icons: true,
      message: '¡Vaya!, aún no tienes productos a devolver',
      detail: 'Todo muy bien.',
      button: false,
    },
    'message-empty-filter': {
      center: true,
      icons: false,
      message: '¡Vaya!, No encontramos coincidencias',
      detail: 'No hay Órdenes que coincidan con los filtros aplicados.<br> Por favor vuelve a intentarlo.'
    },
    'error-server-filter': {
      center: true,
      icons: false,
      message: 'Tenemos problemas para mostrar esta página',
      detail: 'En este momento no podemos mostrarte la página de filtros. Por favor, inténtalo nuevamente.',
      button: true,
    },
    'error-server': {
      center: true,
      icons: false,
      message: 'Tenemos problemas para mostrar la información',
      detail: 'No pudimos desplegar la información solicitada. Por favor, inténtalo nuevamente.',
      button: true,
    }
  };
  errorMessage!: IMessage;

  // MOTIVOS, SUBMOTIVOS Y CONDICIONES
  reasonsubmotiveConditions!: IReasons;
  reasonsPromise!: Promise<boolean>;

  // YEI
  showReturnTable: boolean = true;
  accIsOpen = [false, false, false];

  constructor(
    public formB: FormBuilder,
    public router: Router,
    private _route: ActivatedRoute,
    public returnService: ReturnService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {

    const foStep1 = this.returnService.getLocalData('fo-step1');

    if (this.logisticDetail && foStep1) {
      const reasonSubMotCond = this.returnService.getReasons();
      if (Object.keys(reasonSubMotCond).length === 0) {

        this.reasonsPromise = this.returnService.refreshReasons();
        this.reasonsPromise.then(( _bol: boolean) => {
          this.initStep2();
        }).catch((error) => {
          console.log("Promise rejected with " + JSON.stringify(error));
          this.noResults();
        });

      } else {
        this.initStep2();
      }
    } else {
      this.noResults();
    }
  }
  noResults() {
    this.router.navigate([`/home`]);
  }
  initStep2(){
    const foStep2 = this.returnService.getLocalData(this.stepId);
    this.reasonsubmotiveConditions = this.returnService.getReasons();
    if (this.logisticDetail && this.logisticDetail.items && this.logisticDetail.items.length > 0) {
      this.loadUp(this.logisticDetail);
    }
    if(foStep2){
      this.returnProducts21 = foStep2;
      this.previousRecharge(this.returnProducts21);
    }
  }
  loadUp(data: ILogisticDetail) {
    // Cambio Temporal 
    // Yeison
    data.items.forEach((product: IProductLogistic) => {
      this.addItemProduct(product);
    });
    // data.packages.forEach((pack: IPackageLogistic) => {
    //   pack.products.forEach((product: IProductLogistic) => {
    //     this.addItemProduct(product);
    //   });
    // });
  }

  // FORMS GROUPS
  getProductItemform(): FormGroup {
    // let productItemform: FormGroup = this.formB.group({
    return this.formB.group({
      check: [false, [Validators.required]],
      sku: ['', []],
      name: ['', []],
      quantityReturn: [-1, [Validators.min(0)]],
      quantityTotal: [0, []],
      reasonsReturnList: this.formB.array([])
    });
    // let reasonItemform: FormGroup = this.getReasonItemform();
  }

  getControls(form: FormGroup, controlName: string): AbstractControl[] {
    return (form.get(controlName) as FormArray).controls;
  }
  getFormControl(form: FormGroup, controlName: string): FormControl {
    return (form.get(controlName) as FormControl);
  }
  counter(numb: number) {
    return new Array(numb);
  }

  // PRODUCTS
  addItemProduct(product: IProductLogistic): void {
    let usersArray = this.returnProductsform.get('returnProductList') as FormArray;
    let productForm: FormGroup = this.getProductItemform();
    productForm.setValue({
      check: false,
      sku: product.sellerSkuId ? product.sellerSkuId : '',
      name: product.name + '. ' + product.detail,
      quantityReturn: -1,
      quantityTotal: product.availableQty ? product.availableQty : 0,
      reasonsReturnList: []
    });
    usersArray.push(productForm);
    // this.items = this.orderForm.get('items') as FormArray;  
    // this.items.push(this.createItem());
  }

  changeCheckGlobal(evt: EventTarget | null): void {
    const checkValue = (evt as HTMLInputElement).checked;
    let usersArray = this.returnProductsform.get('returnProductList') as FormArray;
    (usersArray.controls as FormGroup[]).forEach((element: FormGroup, index: number) => {
      element.patchValue({
        check: checkValue
      });
    });
  }

  nextStep2() {
    this.returnProducts21 = this.returnProductList.value.filter((prod: IProductsReturn) => prod.check === true);
    this.returnProducts21.forEach((_e, i) => {
      this.accIsOpen[i] = false;
    });
    this.showReturnTable = false;
  }

  validateNextBtn(): boolean {
    let validate = this.returnProductList.value.filter((prod: IProductsReturn) => prod.check === true);
    let valid = true;
    let sum = true;
    let qreturn = true;
    validate.forEach((ele: IProductsReturn) => {
      let auxSum = 0;
      ele.reasonsReturnList.forEach((element: IReasonsReturn) => {
        const p = (
          element.amount > 0 &&
          element.conditions.length > 0 &&
          element.return.length > 0 &&
          element.submotive.length > 0
        );
        if (!p) {
          valid = false;
        }

        auxSum = auxSum + element.amount;
      });
      const q = (ele.quantityReturn === auxSum);
      if (!q) {
        sum = false;
      }
      if (!(ele.quantityReturn > 0)) {
        qreturn = false;
      }
    });
    return valid && sum && qreturn && (validate.length > 0);
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

    return textCondition;
  }


  skuDeleteItem(skuDelete: string) {
    this.returnProducts21.forEach((e, i) => {
      if (e.sku === skuDelete) {
        this.returnProducts21.splice(i, 1);
      }
    });
    (this.returnProductList.controls as FormGroup[]).forEach((el: FormGroup, i: number) => {
      if (el.value.sku === skuDelete) {
        (el.get('reasonsReturnList') as FormArray).clear();
        el.patchValue({
          quantityReturn: -1,
          check: false
        });
      }
    });
  }

  // Recharge: Funciones que recargan la data del paso 2, en caso se halla guardado en el sessionStorage
  previousRecharge(dataStep2: IProductsReturn[]){
    (this.returnProductList.controls as FormGroup[]).forEach((el: FormGroup, i: number) => {
      const checkStep2 = dataStep2.filter(product => product.sku === el.value.sku);
      if (checkStep2.length > 0) {
        el.patchValue({
          quantityReturn: checkStep2[0].quantityReturn,
          check: checkStep2[0].check
        });

        (checkStep2[0].reasonsReturnList).forEach(element => {
          let reasonsArray = el.get('reasonsReturnList') as FormArray;
          let reasonForm: FormGroup = this.getReasonItemformRecharge();
          reasonForm.setValue({
            amount: element.amount,
            return: element.return,
            submotive: element.submotive,
            conditions: element.conditions,
            sumValidate: element.sumValidate,
          });
          reasonsArray.push(reasonForm);
        });
      }

    });
  }
  getReasonItemformRecharge(): FormGroup {
    return this.formB.group({
      amount: [-1, []],
      return: ['', []],
      submotive: ['', []],
      conditions: ['', []],
      sumValidate: [false, []],
    });
  }



  nextStep(): void {
    this.returnService.setLocalData(this.stepId, this.returnProducts21);
    this.returnService.setNextStep('step3-fo');
    this.router.navigate([`/returns/step3-fo`]);
  }

  backStep(): void {
    this.returnService.setNextStep('step1-fo');
    this.router.navigate([`/returns/step1-fo`]);
  }

  stopPropagation(e:Event) {
    e.stopPropagation();
  }
}
