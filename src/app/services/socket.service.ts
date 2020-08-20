import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Player } from '../interfaces/player.interface';
import topics from '../shared/topics.arrays';
import { DisplaynamestoreService } from './displaynamestore.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  


  constructor(private afs: AngularFirestore, private playerStore: DisplaynamestoreService, private router: Router) {

    this.socket = io.connect();
    this.socket.on('win', (displayName, gameId) => {
      this.startTimer(false);
      let game = this.afs.collection('pictionary').doc(`${gameId}`)
      game.get().subscribe(
        val => {
          let data = val.data();
          let users = [...data.users];
          let allUsers = [...data.users, data.currentArtist]
          let winner = (users.findIndex((user) => user.displayName === `${displayName}`));
          let topic = data.currentTopic
          users[winner].score++;
          if (users[winner].score === data.gameConfig.maxScore) {
            this.gameEnd(allUsers)
          }
          topic = '';


          game.update({ ...data, users: users, currentTopic: topic }).then(v => this.newRound());
          
        }
      )

    })
    this.socket.on('newRound', (gameId) => {
      //select new artist, update firestore, clear board for next artist
      console.log('new round')
      let game = this.afs.collection('pictionary').doc(`${gameId}`)
      game.get().subscribe(
        val => {
          let data = val.data()
          let oldArtist: Player = data.currentArtist as Player
          let nextArtist: Player;
          let users = [...data.users]
          let allUsers = [...data.users, data.currentArtist]
          oldArtist.isArtist = false;
          if (!oldArtist['remove']) {
            users.push(oldArtist);
          }
          nextArtist = users.shift();
          nextArtist.isArtist = true;
          if (nextArtist.isHost) {
            data.gameConfig.currentRound++
            if (data.gameConfig.currentRound > data.gameConfig.maxRounds) {
              data.gameConfig.currentRound--;
              this.gameEnd(allUsers)
            }
          }
          game.update({ ...data, users: users, currentArtist: nextArtist, gameConfig: data.gameConfig })
          let newMsg: Message = {
            displayName: 'System', 
            body: `New Artist is ${nextArtist.displayName}. New Drawing Imminent`};
          this.sendChat(newMsg);
          
        }
      )
    })
    this.socket.on('newTopic', (gameId) => {
      let randomTopic: string = topics[Math.floor(Math.random() * topics.length)];
      this.afs.collection('pictionary').doc(gameId).update({
        currentTopic: randomTopic
      }).then(v => this.clearBoard(true));
      //select new topic, update firestore with new topic
    })
    this.socket.on('leaveGame', (displayName, gameId) => {
      let game = this.afs.collection('pictionary').doc(`${gameId}`)
      game.get().subscribe(
        val => {
          let data = val.data();
          let artist = data.currentArtist
          let users = [...data.users];
          let idx = (users.findIndex((user) => user.displayName === `${displayName}`));
          if (artist.displayName === `${displayName}`) {
            game.update({ currentArtist: { ...artist, remove: true } }).then(v => this.newRound())
          }
          else {
            game.update({
              users: firebase.firestore.FieldValue.arrayRemove(users[idx])
            })
            console.log(game);
          }
        })
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
    this.socket.on('gameEnd', (gameId, allUsers) => {
      allUsers.sort(function (a, b) {
        return b.score - a.score
      })
      let winner = allUsers.shift()
      this.sendWinner(winner)

      //check for user with highest score on firestore
      //do some kind of win functionality
      //delete entry from firebase at some point
    })
    this.socket.on('roomClosed', () =>{
      this.router.navigate(["/home"])
      

    })


  }

  public get startTimer$() {
    return Observable.create((observer) => {
      this.socket.on('startTimer', (time: boolean) => {
        observer.next(time);
      })
    })
  }
  // Sketch observable and functionality
  public get newSketch$() {
    return Observable.create((observer) => {
      this.socket.on('draw', (draw) => {
        observer.next(draw);
      })
    })
  }

  sendSketch(draw) {
    this.socket.emit('draw', draw);

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
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    })
  }
  sendChat(msg: Message) {
    this.socket.emit('newMessage', msg);
  }
  public get winner$() {
    return Observable.create((observer) => {
      this.socket.on('winner', (winner) => {
        observer.next(winner);
      });
    })
  }
  sendWinner(winner){
    this.socket.emit('winner', winner);
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
    this.playerStore.updatePlayer(displayName);
    this.socket.emit('joinGame', displayName, gameId);
  }

  // Leave game function
  leaveGame(displayName: string, gameId: string) {
    this.socket.emit('leaveGame', displayName, gameId);
  }

  // Create game function to setup host socket

  createGame(displayName, gameId) {

    this.playerStore.updatePlayer(displayName);
    this.socket.emit('createGame', displayName, gameId);
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
  gameEnd(allUsers: Array<Object>) {
    console.log('game end function');
    
    this.socket.emit('gameEnd', allUsers)
  }

  startTimer(time) {
    this.socket.emit('startTimer', time);
  }

  roomClosed() {
    this.socket.emit('roomClosed')
  }
  // Game end function(s)
  // When game ends force all users to leave a room and delete it from firestore as an active room
}
