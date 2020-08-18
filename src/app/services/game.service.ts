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


  constructor(private router: Router, private FS: AngularFirestore, private socketService: SocketService) { }



  // Game functionality

  // Create game
  createGame(gameConfig, host: Player) {
    this.removeOldGames();
    this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);
    // The function below is for setting an experation time of 2hrs ofter new game is created
    let add_hours = function (dt, minutes) {
      return new Date(dt.getTime() + minutes * 3600000);
    }
    let validGameUntilTime = (add_hours(new Date(), 2).toString());
    // End
    let createdTime = new Date();

    this.socketService.createGame(this.gameId);
    this.socketService.joinGame(host.displayName, this.gameId)
    console.log(this.gameId);

    this.FS.collection('pictionary').doc(`${this.gameId}`).set({
      createdTime,
      currentArtist: host,
      currentTopic: '',
      gameId: this.gameId,
      validGameUntilTime,
      gameConfig,
      users: []
    }).then(res => this.router.navigate([`/game/${this.gameId}`]))
    // TODO Save gameConfig to FireStore
  }

  newTopic() {
    console.log("game service triggered");

    this.socketService.newTopic();
  }

  getTopic(gameId) {
    let game = this.FS.collection('pictionary').doc(`${gameId}`)
    return game.get().pipe(
      map(val => val.data())
    )
  }
  // Join game function
  joinGame(name: string, gameId) {
    this.socketService.joinGame(name, gameId);
    this.router.navigate([`/game/${gameId}`]);
  }

  navGame(gameId) {
    this.router.navigate([`/game/${gameId}`])
  }

  // Leave game function
  leaveGame() {
    this.router.navigate(["/home"])
  }

  gameInfo(gameId) {
    let game = this.FS.collection('pictionary').doc(`${gameId}`)
    return game.valueChanges().pipe(
      map(val => {
        return val
      }
      ))
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

  //  Removes old games from database(firestor)



  removeOldGames() {
    // Grab the current time
    let now = new Date()
    // Find all items with time less than current time
    // Subscribe and delete each item
    this.FS.collection('pictionary', ref => ref
      .where('validGameUntilTime', "<", now)).valueChanges().subscribe(expired => {
        expired.forEach(g => {
          this.FS.collection('pictionary').doc(g['gameId']).delete();
        })
      })
  }

}

