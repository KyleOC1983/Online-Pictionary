import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  displayName: string = '';
  savedName: boolean = false;

  constructor(private socket: SocketService, private actvr: ActivatedRoute) { }

  saveDisplayName(){
    this.displayName = this.displayName;
    this.savedName = true;
  }

  ngOnInit(): void {
    this.socket.joinGame(this.actvr.snapshot.params.gameId);
  }

  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
