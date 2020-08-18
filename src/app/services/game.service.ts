import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.interface';
import { AngularFirestore } from "@angular/fire/firestore"
import { SocketService } from './socket.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  db = this.FS.collection('pictionary')
  gameId: string
  
  
  constructor(private router: Router, private FS: AngularFirestore, private socketService: SocketService ) { }



  // Game functionality

  // Create game
  createGame(gameConfig, host: Player){
    this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);

      this.socketService.createGame(this.gameId);
      console.log(this.gameId);

      this.FS.collection('pictionary').doc(`${this.gameId}`).set({
        createdTime: new Date(),
        currentArtist: host,
        currentTopic: '',
        gameId: this.gameId,
        validGameUntilTime: new Date(),
        gameConfig,
        users: []
      }).then(res => this.router.navigate([`/game/${this.gameId}`]) )
      // TODO Save gameConfig to FireStore
    }

    newTopic(){
      this.socketService.newTopic();
    }
 
  // Join game function
  joinGame(name: string, gameId) {
    this.socketService.joinGame(name, gameId);
    this.router.navigate([`/game/${gameId}`]);
  }

  navGame(gameId){
    this.router.navigate([`/game/${gameId}`])
  }

  // Leave game function
  leaveGame() {
    this.router.navigate(["/home"])
  }

  gameInfo(gameId){
    let game = this.FS.collection('pictionary').doc(`${gameId}`)
    return game.valueChanges().pipe(
      map(val => {   
      return val}
      ))
    }
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

