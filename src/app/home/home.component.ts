import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomCode: string

  navGame(){
    this.gameService.navGame(this.roomCode)
  }

  displayName: string = '';  

  constructor(private auth: AngularFireAuth, private _snackBar: MatSnackBar, private router: Router, private gameService: GameService) { }

  

  notLoggedIn(){
    if(this.displayName){
      this.router.navigate([`/creategame`])
    } else {
      this._snackBar.open("Must Login to Create New Game", '',{
        duration: 2000,
      })
    }
  }
  ngOnInit(): void {
    this.auth.user.subscribe(user => this.displayName = user ? user.displayName : '');
  }

}
