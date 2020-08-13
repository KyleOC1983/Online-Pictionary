import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy{

  constructor(private socket: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.socket.joinGame(this.router.url);
  }

  ngOnDestroy(): void{
    this.socket.leaveGame();
  }

}
