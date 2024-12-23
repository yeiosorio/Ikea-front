import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkModalReturnCancelComponent } from './sk-modal-return-cancel.component';

describe('SkModalReturnCancelComponent', () => {
  let component: SkModalReturnCancelComponent;
  let fixture: ComponentFixture<SkModalReturnCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkModalReturnCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkModalReturnCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
