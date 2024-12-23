import { ComponentFixture, TestBed } from '@angular/core/testing';

import { step3FoComponent } from './step3.component';

describe('step3FoComponent', () => {
  let component: step3FoComponent;
  let fixture: ComponentFixture<step3FoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ step3FoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(step3FoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
