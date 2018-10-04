import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent, NgbdModalContent} from './popup/popup.component';




const config: SocketIoConfig = { url: 'http://localhost:8010', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    NgbdModalContent

  ],
  entryComponents: [NgbdModalContent],

  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgbModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
