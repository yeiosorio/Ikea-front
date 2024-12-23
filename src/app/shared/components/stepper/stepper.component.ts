import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReturnService } from "@shared/services/return/return.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  step1Fo: string = '';
  step2Fo: string = '';
  step3Fo: string = '';
  step4Fo: string = '';
  stepSubscription$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private returnService: ReturnService
  ) { }

  ngOnInit(): void {
    this.stepSubscription$ = this.returnService.step$.subscribe((step: string) => {
      if (step !==  '') {
        this.setStatusStyle(step)
      }else {
        this.setStatusStyle(this.route?.children[0].snapshot.url[0].path)
      }
    });

  }

  setStatusStyle(step: string) {

    switch (step) {
      case 'step1-fo':
        this.step1Fo = 'currentStep';
        this.step2Fo = '';
        this.step3Fo = '';
        this.step4Fo = '';
        break;
      case 'step2-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'currentStep';
        this.step3Fo = '';
        this.step4Fo = '';
        break;
      case 'step3-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'beforeStep';
        this.step3Fo = 'currentStep';
        this.step4Fo = '';
        
        break;
      case 'step4-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'beforeStep';
        this.step3Fo = 'beforeStep';
        this.step4Fo = 'currentStep';
        break;
      case 'step1-no-fo':
        this.step1Fo = 'currentStep';
        this.step2Fo = '';
        this.step3Fo = '';
        this.step4Fo = '';
        break;
      case 'step2-no-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'currentStep';
        this.step3Fo = '';
        this.step4Fo = '';
        break;
      case 'step3-no-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'beforeStep';
        this.step3Fo = 'currentStep';
        this.step4Fo = '';
        
        break;
      case 'step4-no-fo':
        this.step1Fo = 'beforeStep';
        this.step2Fo = 'beforeStep';
        this.step3Fo = 'beforeStep';
        this.step4Fo = 'currentStep';
        break;
    }
  }

  ngOnDestroy() {
    if (this.stepSubscription$) this.stepSubscription$.unsubscribe();
  }

}
