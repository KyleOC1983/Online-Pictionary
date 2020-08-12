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
    console.log(draw);
  }

  public get canDraw$() {
    return Observable.create((observer) => {
      this.socket.on('canDraw', (canDraw) => {
        observer.next(canDraw);
      });
    });
  }

  canDraw(canDraw){
    this.socket.emit('canDraw', canDraw);
    console.log(canDraw);
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
    joinGame(gameId: string){
      this.socket.emit('joinGame', gameId);
    }
    // Leave game function
    leaveGame(){
      this.socket.emit('leaveGame')
    }
    // Win point function

    // New round function(s)

    // Game end function(s)
}
