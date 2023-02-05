import { Component, Output, EventEmitter, OnChanges} from '@angular/core';
import { WebsocketService } from 'src/app/services/WebSocketService/websocket.service';
import { Message } from 'src/app/interface/Message';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-transcript-box',
  templateUrl: './transcript-box.component.html',
  styleUrls: ['./transcript-box.component.scss']
})
export class TranscriptBoxComponent implements OnChanges {
  content = '';
  summary = '';
  boxTitle = 'Summary';
  disableSummaryFlag = false;
  fileUrl: any;

  constructor(private websocketService: WebsocketService) {
    this.websocketService.on('transcription_end', (data) => {
      console.log(data);
      this.onReceiveMsg(data);
    });

    this.websocketService.on('generate_summary', (data) => {
      console.log(data);
      this.onReceiveSummary(data);
    })

    this.websocketService.on('generate_flashcards', (data) => {
      //console.log(data);
      this.onReceiveFlashcards(data);
    })
  }

  ngOnChanges() {
  }

  sendMsg() {
    this.websocketService.send('send_message', this.content);
  }

  onReceiveMsg(sentMessage: any) {
    this.content = sentMessage.data;
    // console.log(sentMessage.content);
    this.disableSummaryFlag = false;
  }

  onReceiveSummary(sentMessage: any) {
    this.summary = sentMessage.data;
    // console.log(sentMessage.content);
    this.disableSummaryFlag = false;
  }

  onReceiveFlashcards(sentMessage: any) {

    let output: string  = "Questions:\n"

    let questions = sentMessage['data']['Questions']
    let answers = sentMessage['data']['Answers']
    
    for(let q_key in questions) {
      output += q_key + ". " + questions[q_key] + '\n'
    }

    output += "\nAnswers:\n"
    for(let a_key in answers) {
      output += a_key + ". " + answers[a_key] + '\n'
    }

    this.summary = output;
    this.disableSummaryFlag = false;
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

  downloadSummary() {
    const blob = new window.Blob([this.summary], { type: 'text/plain' });
    const downloadAncher = document.createElement("a");
    downloadAncher.style.display = "none";

    const fileURL = URL.createObjectURL(blob);
    downloadAncher.href = fileURL;
    downloadAncher.download = 'transcriptName';
    downloadAncher.click();
  }

  generateFlashcards() {
    const app = document.getElementById("header");
    app!.textContent = "Flashcards";

    this.summary = '';
    this.websocketService.send('generate_flashcards', this.content);
    this.disableSummaryFlag = true;

  }

  generateSummary() {
    const app = document.getElementById("header");
    app!.textContent = "Summary";

    this.websocketService.send('generate_summary', this.content);
    this.disableSummaryFlag = true;
  }

  clearBoxes() {
    this.content = ''
    this.summary = ''
  }
}
