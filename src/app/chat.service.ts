import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor(private http: Http, private httpClient: HttpClient, private socket: Socket) { }

  getMessages() {
    return this.http.get('http://localhost:8200/chats');
  }



/*sendMessage(data) {
    console.log('here is send message with service', data);
    this.socket.emit('message', data);

    this.insertMessage(data);

}*/


/*insertion message + user*/
insertMessage(data) {
  this.http.post('http://localhost:8200/chats', data)
    .subscribe(
      res => {
        console.log( 'Success', res);
      },
      err => {
        console.log('Error occured:' , err);
      }
    );
}


    }
