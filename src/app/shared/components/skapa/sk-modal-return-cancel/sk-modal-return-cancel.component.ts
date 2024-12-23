import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sk-modal-return-cancel',
  templateUrl: './sk-modal-return-cancel.component.html',
  styleUrls: ['./sk-modal-return-cancel.component.scss']
})
export class SkModalReturnCancelComponent {

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
