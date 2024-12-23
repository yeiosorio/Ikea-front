import { ComponentFixture, TestBed } from '@angular/core/testing';

import { step2FoComponent } from './step2.component';

describe('step2FoComponent', () => {
  let component: step2FoComponent;
  let fixture: ComponentFixture<step2FoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ step2FoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(step2FoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
