import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.interface';
import { AngularFirestore } from "@angular/fire/firestore"
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameId: string
  constructor(private router: Router, private FS: AngularFirestore ) { }


// Game functionality

  // Create game
  createGame(gameConfig, host: Player){
    this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);
    console.log(this.gameId);
  
    this.FS.collection('pictionary').doc(`${this.gameId}`).set({
      createdTime: new Date(),
      currentArtist: host,
      currentTopic: null,
      gameId: this.gameId,
      validGameUntilTime: new Date(),
      gameConfig,
      users: [host]
    }).then(res => this.router.navigate([`/game/${this.gameId}`]) )
  }

  // Join game function
  joinGame(gameId){
    this.router.navigate([`/game/${gameId}`])
  }
  // Save New player to FireStore
  newPlayer(name: string, gameId){ 
    console.log(name, gameId);
    let newPlayer: Player = {
    displayName: name,
    isArtist: false,
    isHost: false,
    score: 0}
    console.log(newPlayer);
    
    const game = this.FS.collection('pictionary').doc(`${gameId}`)
    game.update({
      users: firebase.firestore.FieldValue.arrayUnion(newPlayer)
    }) 
  }

  // Leave game function
  leaveGame(){
    this.router.navigate(["/home"])
  }

  // Assign Artist
    // Add current artist to end of Users array
    // Grab [0] of current user array in FS
    // Save to currentArtist
    // Remove that user from user array

  
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