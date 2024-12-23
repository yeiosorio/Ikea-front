import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4NoFoComponent } from './step4-no-fo.component';

describe('Step4NoFoComponent', () => {
  let component: Step4NoFoComponent;
  let fixture: ComponentFixture<Step4NoFoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step4NoFoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step4NoFoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
