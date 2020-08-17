import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostStoreService {

  initHostStatus: boolean = false;

  constructor() { }

  private readonly _user = new BehaviorSubject<boolean>(this.initHostStatus);

  readonly $user: Observable<boolean> = this._user.asObservable();

  private get hostStatus(): boolean{
    return this._user.getValue();
  }

  private set hostStatus(hostStatus){
    this._user.next(hostStatus);
  }

  setHost(host){
    this.hostStatus = host;
  }

}
