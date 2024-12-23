import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMessage } from '@shared/models/messages.model';
import { IProductsReturn, IReasonsReturn, IReasons, ISubmotive } from '@shared/models/return.model';
import { ReturnService } from '@shared/services/return/return.service';

@Component({
  selector: 'app-step2-no-fo',
  templateUrl: './step2-no-fo.component.html',
  styleUrls: ['./step2-no-fo.component.scss']
})
export class Step2NoFoComponent implements OnInit {
  visibleModal: boolean = false;
  stepId: string = 'step2';

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
      icons: false,
      message: '¡Vaya!, aún no tienes productos a devolver',
      detail: 'No hay productos para mostrar.',
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
  loadingReasons = false;


  // MOTIVOS, SUBMOTIVOS Y CONDICIONES
  reasonsubmotiveConditions!: IReasons;


  showReturnTable: boolean = true;
  accIsOpen = [false];

  constructor(
    public formB: FormBuilder,
    public router: Router,
    public returnService: ReturnService,
  ) { }

  ngOnInit(): void {
    const reasonSubMotCond = this.returnService.getReasons();
    this.errorMessage = this.listMessage['message-empty'];
    this.loadingReasons = false;

    if (Object.keys(reasonSubMotCond).length === 0) {
      this.loadingReasons = true;
      this.returnService.refreshReasons()
        .then((res: boolean) => {
          if (res) {
            this.initStep2();
          }
          this.loadingReasons = false;
        })
        .catch((error) => {
          console.log('error: ', JSON.stringify(error));
          this.errorMessage = this.listMessage['error-server'];
          this.loadingReasons = false;
        });

    } else{
      this.initStep2();
    }
  }

  initStep2(){
    const foStep2 = this.returnService.getLocalData(this.stepId);
    this.reasonsubmotiveConditions = this.returnService.getReasons();
    if (foStep2) {
      this.returnProducts21 = foStep2;
      this.previousRecharge(this.returnProducts21);
    } else {
      this.addItemProductEmpty();
    }
  }

  // FORMS GROUPS
  getProductItemform(): FormGroup {
    // let productItemform: FormGroup = this.formB.group({
    return this.formB.group({
      check: [true, [Validators.required]],
      sku: ['', [Validators.minLength(5), Validators.maxLength(8)]],
      name: ['', []],
      quantityReturn: [, [Validators.min(0)]],
      quantityTotal: [0, []],
      reasonsReturnList: this.formB.array([])
    });
    // let reasonItemform: FormGroup = this.getReasonItemform();
  }

  // PRODUCTS
  addItemProductEmpty(): void {
    let usersArray = this.returnProductsform.get('returnProductList') as FormArray;
    let productForm: FormGroup = this.getProductItemform();
    usersArray.push(productForm);
  }


  nextStep2() {
    this.returnProducts21 = this.returnProductList.value;
    this.returnProducts21.forEach((_e, i) => {
      this.accIsOpen[i] = false;
    });
    this.showReturnTable = false;
  }

  validateNextBtn(): boolean {
    let validate = this.returnProductList.value;
    let valid = true;
    let sum = true;
    let qreturn = true;
    // iteracion de todos los elementos
    validate.forEach((ele: IProductsReturn) => {
      let auxSum = 0;

      const auxP = (
        ele.sku.length > 0 &&
        ele.name.length > 0 &&
        ele.quantityReturn > 0
      );
      if (!auxP) {
        qreturn = false;
      }

      // Sumatoria de la lista de condiciones
      ele.reasonsReturnList.forEach((element: IReasonsReturn) => {
        // p: Valida form
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

      // q: Suma Maxima
      const q = (ele.quantityReturn === auxSum);
      if (!q) {
        sum = false;
      }
    });
    return valid && sum && qreturn && (validate.length > 0);
  }

  motiveValue(mot: string): string {
    const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot);
    const textMotive = (reasons.length > 0) ? reasons[0].name : '';

    return textMotive;
  }
  subMotiveValue(mot: string, submot: string): string {
    const reasons = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === mot);
    const subreasons = (reasons.length > 0) ? reasons[0].subReasons : [] as ISubmotive[];
    let textSubmotive = '';
    if (subreasons.length > 0) {
      textSubmotive = (subreasons.filter(submotive => submotive.code === submot))[0].name;
    }

    return textSubmotive;
  }
  conditionValue(cond: string): string {
    const conditions = this.reasonsubmotiveConditions.conditions.filter(condition => condition.code === cond);
    const textCondition = (conditions.length > 0) ? conditions[0].name : '';

    return textCondition;
  }


  skuDeleteItem(skuDelete: string) {
    // this.returnProducts21.forEach((e,i) => {
    //   if (e.sku === skuDelete) {
    //     this.returnProducts21.splice(i, 1);
    //     (this.returnProductList as FormArray).removeAt(i);
    //   }
    // });
    (this.returnProductList.controls as FormGroup[]).forEach((el: FormGroup, i: number) => {
      if (el.value.sku === skuDelete) {
        this.returnProducts21.splice(i, 1);
        (this.returnProductList as FormArray).removeAt(i);
      }
    });
  }

  closeOpen(skuDelete: string) {
    (this.returnProductList.controls as FormGroup[]).forEach((el: FormGroup) => {
      if (el.value.sku === skuDelete) {
        el.patchValue({
          check: true
        });
      } else {
        el.patchValue({
          check: false
        });
      }
    });
  }

  editItemOne(skuDelete: string) {
    this.showReturnTable = true;
    this.closeOpen(skuDelete);
  }
  addItemOne() {
    this.showReturnTable = true;
    this.closeOpen('');
    this.addItemProductEmpty();
  }


  // Recharge: Funciones que recargan la data del paso 2, en caso se halla guardado en el sessionStorage
  previousRecharge(dataStep2: IProductsReturn[]){
    dataStep2.forEach(product => {
      let productArray = this.returnProductsform.get('returnProductList') as FormArray;
      let productForm: FormGroup = this.getProductItemformRecharge(product.reasonsReturnList);
      // check en false para que al cargar los datos guardados del paso 2, se mantengan cerrados los productos pero con la opcion de editar
      productForm.patchValue({
        check: false,
        sku: product.sku,
        name: product.name,
        quantityReturn: product.quantityReturn,
        quantityTotal: product.quantityTotal
      });
      productArray.push(productForm);
    });
  }
  getProductItemformRecharge(numberReasons: IReasonsReturn[]): FormGroup {
    let productItemform: FormGroup = this.formB.group({
      check: [true, [Validators.required]],
      sku: ['', [Validators.minLength(5), Validators.maxLength(8)]],
      name: ['', []],
      quantityReturn: [, [Validators.min(0)]],
      quantityTotal: [0, []],
      reasonsReturnList: this.formB.array([])
    });
    
    let reasonsArray = productItemform.get('reasonsReturnList') as FormArray;
    numberReasons.forEach(element => {
      let reasonItemform: FormGroup = this.getReasonItemformRecharge();
      reasonItemform.setValue({
        amount: element.amount,
        return: element.return,
        submotive: element.submotive,
        conditions: element.conditions,
        sumValidate: element.sumValidate,
      });
      reasonsArray.push(reasonItemform);
    });

    return productItemform;
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
    this.returnService.setNextStep('step3-no-fo');
    this.router.navigate([`/returns/step3-no-fo`]);
  }

  backStep(): void {
    this.returnService.setNextStep('step1-no-fo');
    this.router.navigate([`/returns/step1-no-fo`]);
  }

  stopPropagation(e:Event) {
    e.stopPropagation();
  }
}
