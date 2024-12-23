import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ReturnService } from '@shared/services/return/return.service';

@Component({
  selector: 'app-sk-modal-sheets',
  templateUrl: './sk-modal-sheets.component.html',
  styleUrls: ['./sk-modal-sheets.component.scss']
})
export class SkModalSheetsComponent implements AfterViewInit {

  @Input() public visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() textTitle: string = '';
  @Input() textBtnPrimary: string = '';
  @Input() textBtnSecondary: string = '';
  @ViewChild('scroll') scroll!: ElementRef;

  @Input() backBtn: boolean = false;
  @Output() eventBackBtn = new EventEmitter();
  @Output() eventModalClosed = new EventEmitter();


  constructor(
    public returnService: ReturnService,
  ) { }

  ngAfterViewInit(): void {
    this.returnService.scrollInputCalendar$.subscribe((value: boolean) => {
      if (value) {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
      }
    });
  }

  modalClosed() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.eventModalClosed.emit();
  }

  backbtn() {
    this.eventBackBtn.emit(this.backBtn);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }


}
