import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2NoFoComponent } from './step2-no-fo.component';

describe('Step2NoFoComponent', () => {
  let component: Step2NoFoComponent;
  let fixture: ComponentFixture<Step2NoFoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step2NoFoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2NoFoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
