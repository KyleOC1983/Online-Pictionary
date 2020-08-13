import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameId: string
  constructor(private router: Router) { }


// Game functionality
newGameId(){
  this.gameId = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8);
  return this.gameId
}
  // Create game
  createGame(gameConfig, host: Player){
    const gameId = new Promise ((resolve, reject) => { 
      resolve (this.newGameId())
    })
    gameId.then((value)=> {
      gameConfig = {...gameConfig, gameId: value}
    })
    // TODO Save gameConfig to FireStore

    // TODO Save host:Player to FireStore
    this.router.navigate([`/game/${this.gameId}`])
  }
  // Join game function
  joinGame(gameId){
  }
  // Leave game function
  leaveGame(){
    this.router.navigate(["/home"])
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