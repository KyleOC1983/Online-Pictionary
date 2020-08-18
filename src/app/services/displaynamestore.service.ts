import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import {map} from 'rxjs/operators';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class DisplaynamestoreService {

initialPlayer:  Player; 

  constructor() { }

private readonly _player = new BehaviorSubject<Player>(this.initialPlayer);

readonly player$: Observable<Player> = this._player.asObservable();

private get player(): Player{
  return this._player.getValue();
}

private set player(val: Player){
    this._player.next(val);

}
updatePlayer(player){
  this.player = player;
}
}