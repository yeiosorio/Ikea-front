import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1NoFoComponent } from './step1-no-fo.component';

describe('Step1NoFoComponent', () => {
  let component: Step1NoFoComponent;
  let fixture: ComponentFixture<Step1NoFoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step1NoFoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1NoFoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
