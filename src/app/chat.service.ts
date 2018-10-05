import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ChatService {

  nickname: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private http: Http, private httpClient: HttpClient, private socket: Socket) {

   }
  getMessages() {

    return this.http.get('http://localhost:8010/chats');

  }


  getnewuser() {
        return this.socket
          .fromEvent('broadcast');
      }


      getMessage() {
        return this.socket
          .fromEvent('chat');

      }
  /*insertion message + user*/
  insertMessage(data) {
    this.http.post('http://localhost:8010/chats', data)
      .subscribe(
        res => {
          console.log('Success', res);
        },
        err => {
          console.log('Error occured:', err);
        }
      );

  }

  joinChat(data2) {
      this.socket.emit('join', data2);
      console.log('joinchatdata2', data2);

  }

}
