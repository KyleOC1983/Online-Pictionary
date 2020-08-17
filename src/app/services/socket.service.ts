import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Player } from '../interfaces/player.interface';
import topics from '../shared/topics.arrays';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor(private afs: AngularFirestore) {

    this.socket = io.connect();
    this.socket.on('win', (displayName, gameId) => {
      //update score for user in firestore
      //set topic to blank string
      this.afs.doc('pictionary/' + gameId).update(displayName) //similar to above
      //check to see if it was the last win of the game or not and trigger functionality accordingly
    })
    this.socket.on('newRound', (gameId) => {
      //select new artist, update firestore, clear board for next artist
      let game = this.afs.collection('pictionary').doc(`${gameId}`)
      game.get().subscribe(
        val => {

          let data = val.data()
          let oldArtist: Player = data.currentArtist as Player
          let nextArtist: Player;
          let users = [...data.users]
          oldArtist.isArtist = false;
          users.push(oldArtist);
          nextArtist = users.shift();
          nextArtist.isArtist = true;

          game.update({ ...data, users: users, currentArtist: nextArtist })
        }
      )
      this.clearDraw$.next(true);
    })
    this.socket.on('newTopic', (gameId) => {
      let randomTopic: string = topics[Math.floor(Math.random() * topics.length)];
      this.afs.collection('pictionary').doc(gameId).update({
        currentTopic: randomTopic
      });
      //select new topic, update firestore with new topic
    })
    this.socket.on('leaveGame', (displayName, gameId) => {
      //remove user from firestore
    })
    this.socket.on('joinGame', (displayName, gameId) => {

      let newPlayer: Player = {
        displayName: displayName,
        isArtist: false,
        isHost: false,
        score: 0
      }

      const game = this.afs.collection('pictionary').doc(`${gameId}`)
      game.update({
        users: firebase.firestore.FieldValue.arrayUnion(newPlayer)
      })
      //add user to firestore with init score 0;
    })
    this.socket.on('gameEnd', (gameId) => {
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

  canDraw(canDraw) {
    this.socket.emit('canDraw', canDraw);
    console.log(canDraw);
  }

  public get clearDraw$() {
    return Observable.create((observer) => {
      this.socket.on('clearBoard', (clear) => {
        observer.next(clear);
      })
    })
  }

  //  Chat observable and functionality
  public get chatMessage$() {
    return Observable.create((observer) => {
      this.socket.on('newMessage', (message, displayName) => {
        message.displayName = displayName;
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
  updateDisplayName(displayName: string) {
    this.socket.emit('displayName', displayName);
  }
  // Join game function
  joinGame(displayName: string, gameId: string) {
    this.socket.emit('joinGame', displayName, gameId);
  }

  // Leave game function
  leaveGame() {
    this.socket.emit('leaveGame');
  }

  // Create game function to setup host socket

  createGame(gameId) {
    console.log('creating game');
    this.socket.emit('createGame', gameId);
  }

  // Clear board for all players
  clearBoard(clear) {
    this.socket.emit('clearBoard', clear);
  }
  // Host updates points as necessary
  win() {
    this.socket.emit('win');
  }
  // Probably won't be used
  newRound() {
    this.socket.emit('newRound');
  }

  newTopic() {
    this.socket.emit('newTopic');
  }
  // Triggered on round win for now, add timer later and work with that too

  // Game end function(s)
  // When game ends force all users to leave a room and delete it from firestore as an active room

}