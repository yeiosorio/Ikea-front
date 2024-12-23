import { ComponentFixture, TestBed } from '@angular/core/testing';

import { step4FoComponent } from './step4.component';

describe('step4FoComponent', () => {
  let component: step4FoComponent;
  let fixture: ComponentFixture<step4FoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ step4FoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(step4FoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
