import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkToastComponent } from './sk-toast.component';

describe('SkToastComponent', () => {
  let component: SkToastComponent;
  let fixture: ComponentFixture<SkToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
