import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sk-modal-prompt',
  templateUrl: './sk-modal-prompt.component.html',
  styleUrls: ['./sk-modal-prompt.component.scss']
})
export class SkModalPromptComponent {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() textTitle: string = '';
  @Input() textSubtitle: string = '';
  @Input() textBtnPrimary: string = '';
  @Input() textBtnSecondary: string = '';

  @Output() eventModalClosed = new EventEmitter();

  constructor() { }

  modalClosed(){
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.eventModalClosed.emit();
  }

}
