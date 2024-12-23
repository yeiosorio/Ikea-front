import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFoOptionComponent } from './no-fo-option.component';

describe('NoFoOptionComponent', () => {
  let component: NoFoOptionComponent;
  let fixture: ComponentFixture<NoFoOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFoOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
