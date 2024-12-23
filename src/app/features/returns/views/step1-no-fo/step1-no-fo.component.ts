import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@shared/services/return/return.service';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
  selector: 'app-step1-no-fo',
  templateUrl: './step1-no-fo.component.html',
  styleUrls: ['./step1-no-fo.component.scss']
})
export class Step1NoFoComponent implements OnInit {

  visibleModal: boolean = false;
  stepId: string = 'step1'
  orderId: string = ''
  dni: string = '';
  validRut: boolean = true;
  digitVerified: boolean = true;
  typeId: string = 'RUT'
  dataClientForm!: FormGroup;

  country = `${environment.country}`;
  constructor(
    public router: Router,
    public returnService: ReturnService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGenerator();
    this.retrieveData();
  }

  retrieveData(): void {
    const data = this.returnService.getLocalData(this.stepId)
    if (data) {
      this.dataClientForm.patchValue(data)
      this.digitVerified = true
    }
  }

  formGenerator(): void {
    this.dataClientForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
      ]],
      typeDni: ['RUT', [
        Validators.required,
      ]],
      dni: ['', [
        Validators.required,
      ]],
      rut: ['', []],
      email: ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]]
    });
  }

  nextStep(): void {
    const rut = this.dataClientForm.get('dni')?.value.split('.').join('');
    this.dataClientForm.get('rut')?.setValue(rut);
    this.returnService.setLocalData(this.stepId, this.dataClientForm.value)
    this.returnService.setNextStep('step2-no-fo');

    this.router.navigate(['/returns/step2-no-fo']);
  }

  setTypeId(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.typeId = target.value
    if (this.typeId === 'RUT') {
      this.validateRut();
    }
    if (this.typeId === 'passport') {
      this.digitVerified = true
    }
  }

  validateRut() {
    if (this.country == 'CL' && this.typeId === 'RUT') {
      let formatedDni = this.dataClientForm.get('dni')?.value.split('.').join('');
      
      this.returnService.validateRutCL(formatedDni)
        .subscribe(value => {
          this.digitVerified = value
        })
    } else if (this.country == 'CO') {

    }
  }

  dotsSeparate() {
    let dni = this.dataClientForm.get('dni')?.value;
    let dniArray = dni.split('-');
    let dniDots = '';

    if (dni !== '') {
      if (dniArray[0].length === 11) {
        dniDots = `${dniArray[0].substring(0, dniArray[0].length - 1)}-${dniArray[0].slice(-1)}`
        this.dataClientForm.get('dni')?.setValue(dniDots);
        this.validateRut();
        
      }else {
        let formated: any = new Intl.NumberFormat().format(dniArray[0].split('.').join(''));
        if (formated !== 'NaN') {
          dniDots = formated.replace(/,/g, '.');
          if (dniArray[1]) {
            dniDots = dniDots + '-' + dniArray[1];
          }
          
          this.dataClientForm.get('dni')?.setValue(dniDots);
          this.validateRut();
        }
      }
      
    }
  }

}
