import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import * as tus from 'tus-js-client';
import { WebsocketService } from '../WebSocketService/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private http: HttpClient, private websocketService: WebsocketService) {}

  upload(file: File) {
    // Create a new tus upload
    var upload = new tus.Upload(file, {
      endpoint: 'http://localhost:1080',
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: function (error) {
        console.log('Failed because: ' + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + '%');
      },
      onSuccess: () => {
        console.log('Download %s from %s', 'lol', upload.url),
        this.websocketService.send('upload_success', "Hello from client")
      },
    });

    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  }
}
