import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sk-toast',
  templateUrl: './sk-toast.component.html',
  styleUrls: ['./sk-toast.component.scss']
})
export class SkToastComponent {

  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() text: string = '';
  @Input() actionButtonText: string = '';
  @Input() ariaLabelCloseBtn: string = '';
  @Input() notBtnClose: boolean = false; // Visualiza el boton de cerrar

  @Output() actionClick = new EventEmitter();
  @Output() clickToastClosed = new EventEmitter();
  
  constructor() { }

  clickAction(){
    this.actionClick.emit();
  }

  toastClosed(){
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.clickToastClosed.emit();
  }
}
