import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { PlayerState, TopicState } from '../store/reducers';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor(private playerState: PlayerState, private topicState: TopicState) {
    this.socket = io.connect();
    this.socket.on('joinGame', (displayName)=>{
      //firestore stuff here
    })
    this.socket.on('win', (displayName)=>{
      //update score for user in firestore
    })
    this.socket.on('newRound', ()=>{
      //select new artist, update firestore
    })
    this.socket.on('newTopic', ()=>{
      //select new topic, update firestore with new topic
    })
    this.socket.on('leaveGame', (displayName)=>{
      //remove user from firestore
    })
    this.socket.on('joinGame', (displayName)=>{
      //add user to firestore with init score 0;
    })
    this.socket.on('gameEnd', ()=>{
      //check for user with highest score on firestore
      //do some kind of win functionality
    })
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

  // Host updates artist and sets value in firestore, has to be host to update firestore initial artist can be host for now

  // Game functionality
  // Set display name
    updateDisplayName(displayName: string){
      this.socket.emit('displayName', displayName);
    }
    // Join game function
    joinGame(gameId: string){
      this.socket.emit('joinGame', gameId);
    }
    // Add user to firestore
    
    // Leave game function
    leaveGame(){
      this.socket.emit('leaveGame');
    }
    // Create game function to setup host socket
    createGame(gameId){
      this.socket.emit('createGame', gameId);
    }
    // Win point function
    // On win host updates points for winning player and then triggers the start of a new round

    // New round function(s)
    // Host goes to next artist in state and updates firestore with who the artist is
    // Clear board for all players
    // Host updates points as necessary
    // Triggered on round win for now, add timer later and work with that too

    // Game end function(s)
    // When game ends force all users to leave a room and delete it from firestore as an active room

  }