import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';

/* creation objet */
 interface ChatsInterface {
  user: String;
  chat: String;
  ladate;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AppComponent implements OnInit {


  title = 'ChatAngular6';
  today: number = Date.now();
  msgtxt: String;
  msg: String;
  ladate: String;
  user: String;


  constructor(private socket: Socket, private chatService: ChatService, config: NgbModalConfig ) {

    config.backdrop = 'static';
    config.keyboard = true;
   // this.modalService.open(this.content);
  }

 /* ngAfterViewInit() {
    this.modalService.open(this.content);



  }*/


  getMessage() {
    return this.socket
      .fromEvent('chat');
  }

  getnewuser() {
    return this.socket
      .fromEvent('broadcast');
  }

  ngOnInit() {


    this.chatService.getMessages().subscribe(res2 => {
      this.msg = res2.json().reverse();
    });
    this.getMessage().subscribe(res => {
      // get all message from api
      this.chatService.getMessages().subscribe(res2 => {
        this.msg = res2.json().reverse();
      });
    });
   }

  sendMessage() {
    console.log('sendMessage-> nickname', this.chatService.nickname.value);
const chatInter = <ChatsInterface>{
  user: this.chatService.nickname.value,
  chat: this.msgtxt,
  ladate: Date.now()
};
      this.chatService.insertMessage(chatInter);

  }
/*open(content) {
    this.modalService.open(content);
  }*/

  join() {
    this.chatService.joinChat({user: this.chatService.nickname.value});
    console.log('user add', this.chatService.nickname.value);
}
}


