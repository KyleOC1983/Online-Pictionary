import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Player } from '../interfaces/player.interface';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnChanges {
  @Input() users: Array<Player> = [];
  @Input() artist: Player;
  @Input() winner: Player
  @Input() gameConfig;
  allUsers: Array<Player> = []
  constructor() { }

  ngOnChanges() {
    if (this.users && this.artist) {
      this.allUsers = [...this.users, this.artist]
    }
  }

}
