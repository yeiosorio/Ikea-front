import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkInlineMessageComponent } from './sk-inline-message.component';

describe('SkInlineMessageComponent', () => {
  let component: SkInlineMessageComponent;
  let fixture: ComponentFixture<SkInlineMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkInlineMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkInlineMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
