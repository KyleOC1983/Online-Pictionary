import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SketchService {

  socket: any;

  constructor() { 
    this.socket = io.connect();
  }

  public get newSketch$(){
    return Observable.create((observer) => {
      this.socket.on('draw', (draw) => {
          observer.next(draw);
      });
    });
  }

  sendSketch(draw){
    this.socket.emit('draw', draw);
  }

}
