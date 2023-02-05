import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './ material.module';
import { FileUploadButtonComponent } from './components/file-upload-button/file-upload-button.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TranscriptBoxComponent } from './components/transcript-box/transcript-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadButtonComponent,
    WebsocketComponent,
    MainPageComponent,
    TranscriptBoxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
