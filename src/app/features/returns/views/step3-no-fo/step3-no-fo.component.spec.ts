import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3NoFoComponent } from './step3-no-fo.component';

describe('Step3NoFoComponent', () => {
  let component: Step3NoFoComponent;
  let fixture: ComponentFixture<Step3NoFoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3NoFoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3NoFoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
