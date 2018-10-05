import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  newuser: any;


  constructor(private socket: Socket, private chatService: ChatService, config: NgbModalConfig) {

    config.backdrop = 'static';
    config.keyboard = false;
    // this.modalService.open(this.content);
  }

  // ngAfterViewInit() {
  //   this.modalService.open(this.content);



  // }





  ngOnInit() {
    this.chatService.getnewuser().subscribe(res3 => {
      this.newuser = res3;
      console.log('this newuser', res3);
    });

    this.chatService.getMessages().subscribe(res2 => {
      this.msg = res2.json().reverse();
    });
    this.chatService.getMessage().subscribe(res => {
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
    this.chatService.joinChat({ user: this.chatService.nickname.value });

    console.log('user add', this.chatService.nickname.value);
  }
}


