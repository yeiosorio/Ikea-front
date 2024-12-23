import { Component, Input } from '@angular/core';
import { IMessage } from '@shared/models/messages.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() messageObject!: IMessage;
  
  constructor() { }

  pageReload(): void {
    window.location.reload();
  }

}
