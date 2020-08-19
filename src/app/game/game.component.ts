import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { GameService } from '../services/game.service';
import { GameInfo } from '../interfaces/gameInfo.interface';
import { HostStoreService } from '../services/host.store.service';
import { DisplaynamestoreService } from '../services/displaynamestore.service';
import { interval, Subscription } from 'rxjs';


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
  currentPlayer;
  isArtist: boolean = false;
  timer: number = 10;

  constructor(private socket: SocketService, private gameService: GameService, 
    private actr: ActivatedRoute, private hostStore: HostStoreService, private displayNameStore: DisplaynamestoreService) { }

  savePlayer(){
    this.savedName = true
    this.gameService.joinGame(this.displayName, this.currentGame)
  }
  // not sure that this actually needs to be a function
  // assignArtist(){
  //   this.gameService.updateArtist(this.currentGame)
  // }

  leaveGame(){
    this.gameService.leaveGame(this.displayName, this.currentGame)
  }
  newTopic(){
    this.gameService.newTopic();
    this.startCountdown()
  }

  ngOnInit(): void {
    this.socket.startTimer$.subscribe(val =>{
      let sub = interval(1000)
      let subRef: Subscription
      if(val == true){
        
        subRef = sub.subscribe(v=>{
          this.timer = 10-v;
          
          if(this.timer == 0){
            this.socket.newRound();
            subRef.unsubscribe();
            this.timer = 10
          }
        })
      }
          else{
            subRef.unsubscribe()
            this.timer = 10;
          }
    })

    this.displayNameStore.player$.subscribe(val=> this.currentPlayer = val)
    
    this.currentGame = this.actr.snapshot.params.gameId;
    this.gameService.gameInfo(this.currentGame).subscribe((val: any) => {
      if(this.currentPlayer == val.currentArtist.displayName){
        this.isArtist = true;
      } else{
        this.isArtist = false;
      }
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
    })
    this.hostStore.$hostStatus.subscribe(val =>
      {this.isHost = val});
    if(this.isHost === true){
      this.savedName = true
    } 
  }


  ngOnDestroy(): void{
    this.socket.leaveGame(this.displayName, this.currentGame);
  }

  startCountdown() {
    this.socket.startTimer(true);

    
  }

}
