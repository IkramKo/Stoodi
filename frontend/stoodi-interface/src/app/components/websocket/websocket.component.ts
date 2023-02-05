import { Component } from '@angular/core';
import { Message } from 'src/app/interface/Message';
import { WebsocketService } from 'src/app/services/WebSocketService/websocket.service';


@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent {
  content = '';
  received: Message[] = [];
  sent: Message[] = [];
  message = 'e';

  constructor(private websocketService: WebsocketService) {
    // websocketService.messages.subscribe((msg: Message) => {
    //   this.received.push(msg);
    //   console.log("Response from websocket: " + msg);
    // });
  }
}
