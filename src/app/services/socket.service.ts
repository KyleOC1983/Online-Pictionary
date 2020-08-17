import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor(private afs: AngularFirestore) {

    this.socket = io.connect();
    this.socket.on('joinGame', (displayName, gameId)=>{
      //add user to firestore collection for the game
      this.afs.doc('pictionary/' + gameId).update(displayName) //something like this maybe?
    })
    this.socket.on('win', (displayName, gameId)=>{
      //update score for user in firestore
      this.afs.doc('pictionary/' + gameId).update(displayName) //similar to above
    })
    this.socket.on('newRound', (gameId)=>{
      //select new artist, update firestore, clear board for next artist
    })
    this.socket.on('newTopic', (gameId)=>{
      //select new topic, update firestore with new topic
    })
    this.socket.on('leaveGame', (displayName, gameId)=>{
      //remove user from firestore
    })
    this.socket.on('joinGame', (displayName, gameId)=>{
      //add user to firestore with init score 0;
    })
    this.socket.on('gameEnd', (gameId)=>{
      //check for user with highest score on firestore
      //do some kind of win functionality
      //delete entry from firebase at some point
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

  public get clearDraw$(){
    return Observable.create((observer)=>{
      this.socket.on('clearBoard', (clear)=>{
        observer.next(clear);
      })
    })
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
    
    // Leave game function
    leaveGame(){
      this.socket.emit('leaveGame');
    }

    // Create game function to setup host socket

    createGame(gameId){
      this.socket.emit('createGame', gameId);
    }

    // Clear board for all players
    clearBoard(clear){
      this.socket.emit('clearBoard', clear);
    }
    // Host updates points as necessary
    // Triggered on round win for now, add timer later and work with that too

    // Game end function(s)
    // When game ends force all users to leave a room and delete it from firestore as an active room

  }