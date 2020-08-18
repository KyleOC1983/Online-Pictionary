import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';
import { GameInfo } from '../interfaces/gameInfo.interface';
import { HostStoreService } from '../services/host.store.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{
  gameInfo: GameInfo
  displayName: string = '';
  savedName: boolean = false;
  currentGame: string;
  isHost: boolean

  constructor(private socket: SocketService, private gameService: GameService, private actr: ActivatedRoute, private hostStore: HostStoreService) { }

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
    this.gameService.gameInfo(this.currentGame).subscribe((val: any) => {
      console.log(val);

       this.gameInfo = {
        gameId: val.gameId,
        artist: val.currentArtist,
        currentTopic: val.currentTopic,
        users: val.users,
        gameConfig: {
          maxRounds: val.gameConfig.maxRounds,
          maxScore: val.gameConfig.maxScore,
          currentRound: val.gameConfig.currentRound
        }
      }
      console.log(this.gameInfo);
    })
    console.log(this.isHost);
    this.hostStore.$hostStatus.subscribe(val =>
      {this.isHost = val});
      console.log(this.isHost); 
    if(this.isHost === true){
      this.savedName = true
    } 
  }


  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
