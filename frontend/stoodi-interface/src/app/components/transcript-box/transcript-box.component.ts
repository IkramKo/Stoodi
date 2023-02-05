import { Component } from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocketService/websocket.service';
import { Message } from 'src/app/interface/Message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transcript-box',
  templateUrl: './transcript-box.component.html',
  styleUrls: ['./transcript-box.component.scss']
})
export class TranscriptBoxComponent {
  content = '';
  message = '';

  constructor(private websocketService: WebsocketService) {
    this.websocketService.on('transcription_event', (sentMessage: any) => { this.onReceiveMsg(sentMessage) });
  }

  sendMsg() {
    this.websocketService.send('send_message', this.content);
  }

  onReceiveMsg(sentMessage: any) {
    console.log("message received, event triggered");
    console.log(sentMessage);
    console.log(sentMessage.data);
    // console.log(sentMessage.content);
    this.message = sentMessage.content; 
  }

  onNewMessage() {
    return new Observable(observer => {
      this.websocketService.on('upload_success', msg => {
        observer.next(msg);
      });
    });
  }
}
