import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { IReasons, ISubmotive } from '@shared/models/return.model';

@Component({
  selector: 'app-reasons-return',
  templateUrl: './reasons-return.component.html',
  styleUrls: ['./reasons-return.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class ReasonsReturnComponent implements OnInit {

  @Input() idxNumber!: number;
  @Input() formGName: string = '';
  @Input() reasonsubmotiveConditions!: IReasons; // MOTIVOS, SUBMOTIVOS Y CONDICIONES

  formParent: FormGroup = this.formB.group({
    check: [false, [Validators.required]],
    sku: ['', []],
    name: ['', []],
    quantityReturn: [-1, [Validators.min(0)]],
    quantityTotal: [0, []],
    reasonsReturnList: this.formB.array([])
  });
  reasonsReturnList!: FormArray;


  constructor(
    public formB: FormBuilder,
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.formParent = (this.rootFormGroup.control.get(this.formGName) as FormArray).at(this.idxNumber) as FormGroup;
    this.reasonsReturnList = this.formParent.get('reasonsReturnList') as FormArray;
  }

  getReasonItemform(): FormGroup {
    // let reasonItemform: FormGroup = this.formB.group({
    return this.formB.group({
      amount: [-1, []],
      return: ['', []],
      submotive: ['', []],
      conditions: ['', []],
      sumValidate: [false, []],
    });
    // sumValidate: [false, [Validators.requiredTrue]],
  }
  getControls(form: FormGroup, controlName: string): AbstractControl[] {
    return (form.get(controlName) as FormArray).controls;
  }
  getFormControl(form: FormGroup, controlName: string): FormControl {
    return (form.get(controlName) as FormControl);
  }
  counter(numb: any) {
    return new Array(parseInt(numb));
  }

  // PRODUCTS
  addItemReason(): void {
    let reason: FormGroup = this.getReasonItemform();
    this.reasonsReturnList.push(reason);
  }
  deleteItemReason(idx: number): void {
    this.reasonsReturnList.removeAt(idx);
  }


  // Cantidad de productos a devolver
  changeQuantityReturn(evt: EventTarget | null): void {
    const numb = parseInt((evt as HTMLSelectElement).value);
    // limpiar lista de motivos
    this.reasonsReturnList.clear();
    if (numb > 0) {
      this.addItemReason();
    }
  }
  changeQuantityItemReturn(evt: EventTarget | null, idx: number): void {
    const numb = parseInt((evt as HTMLSelectElement).value);

    let quantityArray = (this.formParent.get('reasonsReturnList') as FormArray);
    let quantityLength = quantityArray.controls.length;

    // Convierte de string a numero el valor del select, al menos lo valida
    let miForm = quantityArray.at(idx) as FormGroup;
    miForm.patchValue({
      amount: numb
    });
    // Elimina las filas siguientes del elemento editado, para mantener la numeracion en orden
    for (let i = 0; idx < (quantityLength - 1); i++) {
      this.deleteItemReason(idx + 1);
      quantityLength = quantityLength - 1;
    }
  }
  changeMotiveSelect(evt: EventTarget | null, idx: number): void {
    const code = (evt as HTMLSelectElement).value;
    console.log('changeMotiveSelect1: ', code, idx);
    let miForm = this.reasonsReturnList.at(idx) as FormGroup;
    miForm.patchValue({
      submotive: ''
    });
  }
  subMotivesList(idx: number): ISubmotive[] {
    const reasonsReturns = (this.reasonsReturnList.value)[idx];
    const motives = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === reasonsReturns.return);
    const submotives = (motives.length > 0) ? motives[0].subReasons : [] as ISubmotive[];
    
    return submotives;
  }
  limitQuantityItemReturns(idx: number): number {
    // Calcula el la cantidad maxima a seleccionar de esa fila, para ello suma los valores de las filas anteriores
    let quantityArray = (this.formParent.get('reasonsReturnList') as FormArray);
    let auxSum = 0;
    let limitItem = 0;
    (quantityArray.controls as FormGroup[]).forEach((element: FormGroup, index: number) => {
      if (index < idx) {
        auxSum = auxSum + element.value.amount;
      }
    });
    // resta el limite principal seleccionado con la suma de los anteriores
    limitItem = this.formParent.value.quantityReturn - auxSum;

    return (limitItem > 0) ? limitItem : 0;
  }
  addItemReasonPlus() {
    this.addItemReason();
  }
  // valida los casos en que el boton agregar se habilita o deshabilita
  validateActionsItem(idx: number): boolean {
    let miForm = (this.formParent.get('reasonsReturnList') as FormArray).at(idx) as FormGroup;
    // console.log(miForm.value);
    
    const p = (
      miForm.value.amount > 0 &&
      miForm.value.conditions.length > 0 &&
      miForm.value.return.length > 0 &&
      miForm.value.submotive.length > 0
    );

    let quantityArray = (this.formParent.get('reasonsReturnList') as FormArray);
    let auxSum = 0;
    (quantityArray.controls as FormGroup[]).forEach((element: FormGroup, index: number) => {
      auxSum = auxSum + element.value.amount;
    });
    const availableMax = (this.formParent.value.quantityReturn > auxSum);

    const r = p && availableMax;
    miForm.patchValue({
      sumValidate: r
    });
    return miForm.value.sumValidate;
  }
  // si es ultimo de la lista es plus, demas casos es tacho
  ultimateActionItem(idx: number): boolean {
    // console.log('entra');
    
    let quantityLength = (this.formParent.get('reasonsReturnList') as FormArray).controls.length;
    if (quantityLength === (idx + 1)) {
      return true;
    } else {
      return false;
    }
  }


}
