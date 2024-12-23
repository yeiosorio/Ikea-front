import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRequestOptionsComponent } from './return-request-options.component';

describe('ReturnRequestOptionsComponent', () => {
  let component: ReturnRequestOptionsComponent;
  let fixture: ComponentFixture<ReturnRequestOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnRequestOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
