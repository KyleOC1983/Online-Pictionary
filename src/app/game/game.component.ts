import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { FormControl } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  displayName: string = '';
  savedName: boolean = false;
  currentGame: string = '';

  constructor(private socket: SocketService, private actvr: ActivatedRoute, private gameService: GameService) { }

  saveDisplayName(){
    this.displayName = this.displayName;
    this.savedName = true;
  }

  newTopic(currentGame){
    this.gameService.newTopic(currentGame);
  }


  ngOnInit(): void {
    this.socket.joinGame(this.actvr.snapshot.params.gameId);
    this.currentGame = this.actvr.snapshot.params.gameId;
  }

  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
