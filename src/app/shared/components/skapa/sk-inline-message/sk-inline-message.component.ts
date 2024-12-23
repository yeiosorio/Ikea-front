import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sk-inline-message',
  templateUrl: './sk-inline-message.component.html',
  styleUrls: ['./sk-inline-message.component.scss']
})
export class SkInlineMessageComponent {

  // informative-cautionary-negative-positive
  @Input() typeMessage: string = 'informative';
  @Input() textTitle: string = '';
  @Input() textDescription: string = '';
  

  constructor() { }

}
