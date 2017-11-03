import { Component, Input } from '@angular/core';

import { Message, MessageType } from './message';

@Component({
  selector: 'tk-message-banner',
  template: `
  <ul> 
    <li *ngFor="let message of messages"> 
      <p class="{{message.type === messageType.error ? 'error-text' : 'success-text'}}">
        {{message.message}}
      </p>
    </li>
  </ul>
  `
})
export class MessageBannerComponent {
  @Input() messages: Message[];
  messageType: typeof MessageType = MessageType;
}