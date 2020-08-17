import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostStoreService {

  initHostStatus: boolean = false;

  constructor() { }

  private readonly _hostStatus = new BehaviorSubject<boolean>(this.initHostStatus);

  readonly $hostStatus: Observable<boolean> = this._hostStatus.asObservable();

  private get hostStatus(): boolean{
    return this._hostStatus.getValue();
  }

  private set hostStatus(hostStatus){
    this._hostStatus.next(hostStatus);
  }

  setHost(host){
    this.hostStatus = host;
  }

}
