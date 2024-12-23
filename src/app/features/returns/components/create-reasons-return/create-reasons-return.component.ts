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
import { IMotive, IReasons, ISkuDetailReturn, ISubmotive } from '@shared/models/return.model';
import { ReturnService } from '@shared/services/return/return.service';
import { Observable, share, take } from 'rxjs';

@Component({
  selector: 'app-create-reasons-return',
  templateUrl: './create-reasons-return.component.html',
  styleUrls: ['./create-reasons-return.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class CreateReasonsReturnComponent implements OnInit {

  @Input() idxNumber!: number;
  @Input() formGName: string = '';
  @Input() reasonsubmotiveConditions!: IReasons; // MOTIVOS, SUBMOTIVOS Y CONDICIONES

  formParent: FormGroup = this.formB.group({
    check: [true, []],
    sku: ['', [Validators.minLength(5), Validators.maxLength(8)]],
    name: ['', []],
    quantityReturn: [, [Validators.min(0)]],
    quantityTotal: [0, []],
    reasonsReturnList: this.formB.array([])
  });
  reasonsReturnList!: FormArray;

  // Objeto de resultado de busqueda
  searchSkuResultObs!: Observable<ISkuDetailReturn>;
  // Observable del texto a buscar
  // searchTerm$ = new Subject<string>();


  // VARIABLES AUXILIARES
    // Habilita lupa
    magnifyingGlass = false;
    // Habilita cuadro de resultados
    resultSearch = false;
    // Habilita loading del cuadro de resultados
    loadingResultSearch = false;
    // ultimo valor del input de busqueda
    oldValueSearch = '';

  constructor(
    public formB: FormBuilder,
    private rootFormGroup: FormGroupDirective,
    private returnService: ReturnService
  ) {}

  ngOnInit(): void {
    this.formParent = (this.rootFormGroup.control.get(this.formGName) as FormArray).at(this.idxNumber) as FormGroup;
    this.reasonsReturnList = this.formParent.get('reasonsReturnList') as FormArray;
    console.log('motive: ', this.reasonsubmotiveConditions);
  }

  // SEARCH *************************************
  searchSKUInput(sku: string){
    console.log('>>> sku: ', sku, this.oldValueSearch);
    // if (this.oldValueSearch === sku) {
    //   return;
    // }
    // al editar el sku se debe resetear el componente
    this.resetReasonReturn();
    if (sku.length > 4 && sku.length < 9) {
      // activar lupa
      this.magnifyingGlass = true;
      // activar loading de resultado
      this.loadingResultSearch = true;
      // activar bloque de resultado
      this.resultSearch = true;
      // realiza busqueda
      this.searchSkuResultObs = this.returnService.searchSKU(sku).pipe(
        share()
      );
      this.searchSkuResultObs.pipe(take(1))
        .subscribe({
          next: (results: ISkuDetailReturn) => {
            // desactivar loading de resultado
            this.loadingResultSearch = false;
            console.log('>> search: ', results.longDescription); 
          },
          error: (e) => {
            this.loadingResultSearch = false;
            console.error('>>><< error: ', e);
          },
          complete: () => console.info('complete')
        });
    } else {
      // lupa desactivar
      this.magnifyingGlass = false;
      // desactivar bloque de resultado
      this.resultSearch = false;
    }
    this.oldValueSearch = sku;
  }
  searchSKUInput2(sku: string){
    // al editar el sku se debe resetear el componente
    this.resetReasonReturn();
    if (sku.length > 4 && sku.length < 9) {
      // activar lupa
      this.magnifyingGlass = true;
    } else {
      // lupa desactivar
      this.magnifyingGlass = false;
      // desactivar bloque de resultado
      this.resultSearch = false;
    }
  }
  clickSearchSKUInput(sku: string){
    this.searchSKUInput(sku);
  }

  resetReasonReturn(){
    // FIX: falta agregar mas parametros al resetear
    this.formParent.patchValue({
      name: ''
    });
    
    const idx = this.formParent.value.quantityReturn;
    this.reasonsReturnList.clear();
    if (idx > 0) {
      this.addItemReason();
    }
  }
  //Imprime el valor selecccionado por la busqueda en el campo item
  printTextItem(nameSearch: string){
    this.formParent.patchValue({
      name: nameSearch
    });
    this.resultSearch = false;
    console.log('>> valor form: ', this.formParent.value.sku, this.formParent.value.name);
  }

  // Elimina todo el item, o componente
  clickDeleteItem(){
    (this.rootFormGroup.control.get(this.formGName) as FormArray).removeAt(this.idxNumber);
  }
  clickEditItem(){
    this.formParent.patchValue({
      check: true
    });
  }


  // PRODUCTS *************************************
  getReasonItemform(): FormGroup{
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
  addItemReason(): void {
    let reason: FormGroup = this.getReasonItemform();
    this.reasonsReturnList.push(reason);
  }
  deleteItemReason(idx: number): void {
    this.reasonsReturnList.removeAt(idx);
  }
  // Cantidad de productos a devolver
  changeQuantityReturn(evt:EventTarget | null): void {
    const numb = parseInt((evt as HTMLInputElement).value);
    // console.log('>>probando numbers: ',numb,(evt as HTMLInputElement).value);
    // limpiar lista de motivos
    this.reasonsReturnList.clear();
    if (numb > 0) {
      this.addItemReason();
    }
  }
  changeQuantityItemReturn(evt:EventTarget | null, idx: number): void {
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
      this.deleteItemReason(idx+1);
      quantityLength = quantityLength - 1;
    }
  }
  changeMotiveSelect(evt:EventTarget | null, idx: number): void {
    const code = (evt as HTMLSelectElement).value;
    console.log('changeMotiveSelect1: ', code, idx);
    let miForm = this.reasonsReturnList.at(idx) as FormGroup;
    miForm.patchValue({
      submotive: ''
    });
  }
  subMotivesList(idx: number): ISubmotive[]{
    const reasonsReturns = (this.reasonsReturnList.value)[idx];

    const motives = this.reasonsubmotiveConditions.reasons.filter(motive => motive.code === reasonsReturns.return);
    const submotives = (motives.length > 0)? motives[0].subReasons: [] as ISubmotive[];

    return submotives;
  }
  limitQuantityItemReturns(idx: number): number{
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
    
    return (limitItem > 0)? limitItem: 0;
  }
  addItemReasonPlus(){
    this.addItemReason();
  }
  // valida los casos en que el boton agregar se habilita o deshabilita
  validateActionsItem(idx: number): boolean {
    let miForm = (this.formParent.get('reasonsReturnList') as FormArray).at(idx) as FormGroup;
    // p: Valida form
    const p = (
      miForm.value.amount > 0 &&
      miForm.value.conditions.length > 0 &&
      miForm.value.return.length > 0 &&
      miForm.value.submotive.length > 0
    );

    // q: Suma Maxima
    let quantityArray = (this.formParent.get('reasonsReturnList') as FormArray);
    let auxSum = 0;
    (quantityArray.controls as FormGroup[]).forEach((element: FormGroup, index: number) => {
        auxSum = auxSum + element.value.amount;
    });
    const q = (this.formParent.value.quantityReturn === auxSum);

    // r = p && ~q
    const r = p && !q;
    miForm.patchValue({
      sumValidate: r
    });
    return !miForm.value.sumValidate;
  }
  // si es ultimo de la lista es plus, demas casos es tacho
  ultimateActionItem(idx: number): boolean{
    let quantityLength = (this.formParent.get('reasonsReturnList') as FormArray).controls.length;
    if (quantityLength === (idx+1)) {
      return true;
    } else {
      return false;
    }
  }

  // Asigna la interface HTMLInputElement del input text
  convertInputText(evt:EventTarget | null): string{
    return (evt as HTMLInputElement).value;
  }
  counter(numb: number){
    return new Array(numb);
  }
  getControls(form: FormGroup, controlName: string): AbstractControl[] {
    return (form.get(controlName) as FormArray).controls;
  }
  getFormControl(form: FormGroup, controlName: string): FormControl {
    return (form.get(controlName) as FormControl);
  }

}
