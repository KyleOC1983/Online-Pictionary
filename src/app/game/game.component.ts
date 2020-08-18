import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  displayName: string = '';
  savedName: boolean = false;
  currentGame: string;

  constructor(private socket: SocketService, private gameService: GameService, private actr: ActivatedRoute) { }

  savePlayer(){
    console.log(this.displayName);
    this.savedName = true
    this.gameService.joinGame(this.displayName, this.currentGame)
  }
  // not sure that this actually needs to be a function
  // assignArtist(){
  //   this.gameService.updateArtist(this.currentGame)
  // }

  newTopic(){
    this.gameService.newTopic();
  }

  ngOnInit(): void {
    this.currentGame = this.actr.snapshot.params.gameId;
  }

  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
