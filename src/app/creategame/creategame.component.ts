import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Player } from "../interfaces/player.interface"


@Component({
  selector: 'app-creategame',
  templateUrl: './creategame.component.html',
  styleUrls: ['./creategame.component.scss']
})
export class CreategameComponent implements OnInit {
  rounds: any[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'},
  ];

  gameSettings: Object = {}
  creatorName: string;
  scoreConfig: number;
  roundConfig: number;
  host: Player;
  constructor(private gameService: GameService) { }


  createGame(){
    this.gameSettings = {creatorName: this.creatorName, maxRounds: this.roundConfig, maxScore: this.scoreConfig }
    this.host = {displayName: this.creatorName, score: 0, isArtist: true, isHost: true}

    this.gameService.createGame(this.gameSettings, this.host)
  }
  ngOnInit(): void {  }

}
