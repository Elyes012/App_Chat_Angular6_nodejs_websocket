import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatService } from './chat.service';


/* creation objet */
 interface ChatsInterface {
  user: String;
  chat: String;
  ladate;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ChatAngular6';
  today: number = Date.now();
name: string;
  msgtxt: String;
  user: String;
  msg: String;
  ladate: String;


  constructor(private socket: Socket, private chatService: ChatService) {

  }


  getMessage() {
    return this.socket
      .fromEvent('chat');
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
const chatInter = <ChatsInterface>{
  user: this.user,
  chat: this.msgtxt,
  ladate: Date.now()
};
      this.chatService.insertMessage(chatInter);

  }



}


