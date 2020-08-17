import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.interface';
import { AngularFirestore } from "@angular/fire/firestore"
import * as firebase from 'firebase';
import { SocketService } from './socket.service';
import topics from '../shared/topics.arrays';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  db = this.FS.collection('pictionary')
  gameId: string
  randomTopic: string = topics[Math.floor(Math.random() * topics.length)]; 
  
  constructor(private router: Router, private FS: AngularFirestore, private socketService: SocketService ) { }



  // Game functionality

  // Create game
  createGame(gameConfig, host: Player){
    this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);

      this.socketService.createGame(this.gameId);
      console.log(this.gameId);

      this.FS.collection('pictionary').add({
        createdTime: new Date(),
        currentArtist: host,
        currentTopic: this.randomTopic,
        gameId: this.gameId,
        validGameUntilTime: new Date(),
        gameConfig,
        users: [host]
      }).then(res => this.router.navigate([`/game/${this.gameId}`]) )
      // TODO Save gameConfig to FireStore
    }

    newTopic(gameId){
      this.FS.collection('pictionary').doc(gameId).update({
        currentTopic: this.randomTopic});
    }
 
  // Join game function
  joinGame(gameId) {
    this.router.navigate([`/game/${gameId}`])
  }
  // Save New player to FireStore
  newPlayer(name: string, gameId) {
    console.log(name, gameId);
    let newPlayer: Player = {
      displayName: name,
      isArtist: false,
      isHost: false,
      score: 0
    }
    console.log(newPlayer);

    const game = this.FS.collection('pictionary').doc(`${gameId}`)
    game.update({
      users: firebase.firestore.FieldValue.arrayUnion(newPlayer)
    })
  }

  // Leave game function
  leaveGame() {
    this.router.navigate(["/home"])
  }

  // Assign Artist
  // Add current artist to end of Users array
  updateArtist(gameId) {
    let game = this.FS.collection('pictionary').doc(`${gameId}`)
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

        game.update({...data, users: users, currentArtist: nextArtist})
      }
    )
  }

  // Win point function
  // Close topic
  // Assign point to correct player , update state
  // update scoreboard

  // New round function(s)
  // clear the sketchpad
  // increment round counter
  // assign next artist (state)
  // reset timer?

  // Game end function(s)
  // declare game winner
  // navigate to home - dialog box?

}