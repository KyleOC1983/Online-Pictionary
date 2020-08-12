import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() {
    this.socket = io.connect();
  }
  
  // Sketch observable and functionality
  public get newSketch$() {
    return Observable.create((observer) => {
      this.socket.on('draw', (draw) => {
        observer.next(draw);
      });
    });
  }

  sendSketch(draw) {
    this.socket.emit('draw', draw);
  }
  
  //  Chat observable and functionality
  public get chatMessage$() {
    return Observable.create((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }
  
  sendChat(msg: Message) {
    this.socket.emit('newMessage', msg);
  }

  // State functionality


  // Game functionality

    // Join game function
    joinGame(gameId){}
    // Leave game function
    leaveGame(){}
    // Win point function

    // New round function(s)

    // Game end function(s)
}
