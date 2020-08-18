import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Player } from '../interfaces/player.interface';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit  {
  @Input() users: Array<Player>;
  @Input() artist: Player;
  allUsers: Array<Player>
  constructor() { }

  ngOnInit(): void {
    this.allUsers = [...this.users, this.artist]
    console.log(this.allUsers);   
  }
  ngOnChanges(){
    this.allUsers = [...this.users, this.artist]
    console.log(this.allUsers);   
  }

}
