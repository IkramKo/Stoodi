import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/interface/Message';
import { io, Socket } from 'socket.io-client';

const WEBSOCKET_SERVER_URL = 'http://localhost:8089';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socket: Socket;

  constructor() {
    this.socket = io(WEBSOCKET_SERVER_URL, { transports: ['websocket'], upgrade: false }).connect();

    this.socket.on('upload_success', () => {
      console.log('hello world')
    })

    // this.socket.on('transcription_end', (data) => {
    //   console.log(data)
    // })
  }

  reset() {
    this.socket.send('exit');
  }

  // receives event from server
  on<T>(event: string, action: (param: T) => void): void {
    this.socket.on(event, action);
  }

  // sends event to server
  send<T>(event: string, message?: T): void {
    this.socket.emit(event, message)
  }

  onNewMessage() {
    return new Observable(observer => {
      this.on('upload_success', msg => {
        observer.next(msg);
      });
    });
  }


  // private subject: AnonymousSubject<MessageEvent> | undefined;
  // public messages: Subject<Message>;

  // constructor() {
  //   this.messages = <Subject<Message>>this.connect(WEBSOCKET_SERVER_URL + "/69").pipe(
  //     map((response: MessageEvent): Message => {
  //       console.log(response.data);
  //       let data = JSON.parse(response.data);
  //       return data;
  //     })
  //   );
  // }

  // public connect(url: string): AnonymousSubject<MessageEvent> {
  //   if (!this.subject) {
  //     this.subject = this.create(url);
  //     console.log('Successfully connected: ' + url);
  //   }
  //   return this.subject;
  // }

  // private create(url: string): AnonymousSubject<MessageEvent> {
  //   let ws = new WebSocket(url);
  //   let observable = new Observable((obs: Observer<MessageEvent>) => {
  //     ws.onmessage = obs.next.bind(obs);
  //     ws.onerror = obs.error.bind(obs);
  //     ws.onclose = obs.complete.bind(obs);
  //     return ws.close.bind(ws);
  //   });

  //   let observer: Observer<MessageEvent<any>> = {
  //     next: (data: Object) => {
  //       console.log('Message sent to websocket: ', data);
  //       if (ws.readyState === WebSocket.OPEN) {
  //         ws.send(JSON.stringify(data));
  //       }
  //     },
  //     error: function (err: any): void {
  //       throw new Error('Function not implemented.');
  //     },
  //     complete: function (): void {
  //       throw new Error('Function not implemented.');
  //     },
  //   };
  //   return new AnonymousSubject<MessageEvent>(observer, observable);
  // }

  // private handleWSEvents(ws: WebSocket) {
    
  // }

}
