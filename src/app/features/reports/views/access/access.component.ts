import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { environment } from '@env/environment';
import { LoginService } from '@shared/services/login/login.service';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  // visualiza el texto del input de password
  visiblePassword = true;
  // apertura el toast de error del login
  errorReportMessage = false;

  reportForm!: FormGroup;

  constructor(
    public router: Router,
    public formB: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.reportForm = this.formB.group({
      codeForm: ['', [
        Validators.required
      ]],
    });
  }

  onClickSubmit(){
    // console.log('valid form. ', this.loginForm.valid)
    if(this.reportForm.valid){
      const code = this.reportForm.get('codeForm')?.value;

      // if (environment.accessReport === code) {
      if (this.loginService.reportLogin(code)) {
        this.router.navigate(['/reports/report-home']);
      } else {
        this.errorReportMessage = true;
      }
    } else {
      this.reportForm.get('codeForm')?.markAsDirty();
    }
  }

}
