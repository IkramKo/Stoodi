import { Component, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocketService/websocket.service';
import { Message } from 'src/app/interface/Message';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-transcript-box',
  templateUrl: './transcript-box.component.html',
  styleUrls: ['./transcript-box.component.scss']
})
export class TranscriptBoxComponent {
  content = '';
  summary = '';
  fileUrl: any;

  constructor(private websocketService: WebsocketService) {
    this.websocketService.on('transcription_end', (data) => {
      console.log(data);
      this.onReceiveMsg(data);
    })
  }

  sendMsg() {
    this.websocketService.send('send_message', this.content);
  }

  onReceiveMsg(sentMessage: any) {
    this.content = sentMessage.data;
    // console.log(sentMessage.content);
  }

  onReceiveSummary(sentMessage: any) {
    this.summary = sentMessage.data;
    // console.log(sentMessage.content);
  }


  downloadTranscript() {
    const blob = new window.Blob([this.content], { type: 'text/plain' });
    const downloadAncher = document.createElement("a");
    downloadAncher.style.display = "none";

    const fileURL = URL.createObjectURL(blob);
    downloadAncher.href = fileURL;
    downloadAncher.download = 'transcriptName';
    downloadAncher.click();
  }
}
