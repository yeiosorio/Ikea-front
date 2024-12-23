import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkModalPromptComponent } from './sk-modal-prompt.component';

describe('SkModalPromptComponent', () => {
  let component: SkModalPromptComponent;
  let fixture: ComponentFixture<SkModalPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkModalPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkModalPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
