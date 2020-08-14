import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { FormControl } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Player } from '../interfaces/player.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  displayName: string = '';
  savedName: boolean = false;
  constructor(private socket: SocketService, private router: Router, private gameService: GameService, private actr: ActivatedRoute) { }

  savePlayer(){
    let gameId = this.actr.snapshot.params.gameId
    console.log(gameId);
    console.log(this.displayName);
    this.savedName = true
    this.gameService.newPlayer(this.displayName, gameId)
  }

  ngOnInit(): void {
    this.socket.joinGame(this.router.url);
  }

  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
