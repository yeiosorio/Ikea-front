import { ComponentFixture, TestBed } from '@angular/core/testing';

import { step1FoComponent } from './step1.component';

describe('step1FoComponent', () => {
  let component: step1FoComponent;
  let fixture: ComponentFixture<step1FoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ step1FoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(step1FoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
