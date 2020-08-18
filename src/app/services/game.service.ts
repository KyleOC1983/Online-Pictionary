import { Injectable, Query } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.interface';
import { AngularFirestore, fromCollectionRef } from "@angular/fire/firestore"
import { SocketService } from './socket.service';
import topics from '../shared/topics.arrays';
import { Time } from '@angular/common';
import { time } from 'console';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { firestore } from 'firebase';
import { element } from 'protractor';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameId: string
  randomTopic: string = topics[Math.floor(Math.random() * topics.length)]; 
  
  constructor(private router: Router, private FS: AngularFirestore, private socketService: SocketService ) { }


// Game functionality

  // Create game
  createGame(gameConfig, host: Player){
    this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);
  // The function below is for setting an experation time of 2hrs ofter new game is created
    let add_hours = function (dt, minutes) {
      return new Date(dt.getTime() + minutes*3600000);
  }
    let validGameUntilTime = (add_hours(new Date(), 2).toString());
  // End
    let createdTime = new Date();

      this.socketService.createGame(this.gameId);
      console.log(this.gameId);

      this.FS.collection('pictionary').add({
        createdTime,
        currentArtist: host,
        currentTopic: this.randomTopic,
        gameId: this.gameId,
        validGameUntilTime,
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
  joinGame(gameId){
    this.router.navigate([`/game/${gameId}`])
  }
  newPlayer(){ 
    // Save New player to FireStore
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

  //  Removes old games from database(firestor)
  


  removeOldGames(gameId, createdTime){
    if(this.FS.collection('pictiionary', ref => ref
      .where('validGameUntilTime', "<", createdTime )).valueChanges()
    )
   );   
    
  };