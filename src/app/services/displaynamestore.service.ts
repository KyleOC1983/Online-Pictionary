import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';
import {map} from 'rxjs/operators';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class DisplaynamestoreService {

initialDisplayName:  string; 

  constructor() { }

private readonly _player = new BehaviorSubject<string>(this.initialDisplayName);

readonly player$: Observable<string> = this._player.asObservable();

private get player(): string{
  return this._player.getValue();
}

private set player(val: string){
    this._player.next(val);

}
updatePlayer(player){
  this.player = player;
}
}