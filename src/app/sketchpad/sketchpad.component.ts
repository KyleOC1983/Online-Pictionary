import { Component, OnInit } from '@angular/core';
import { Project, Path, Point } from 'paper'; 
import * as paper from 'paper';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {

  
  myPath: any;
  project1: any;
  myDraw: boolean = true;
  canDraw: boolean;
  artistPath: any;


  constructor(private socket: SocketService) { }

  startDraw(){
    this.myPath = new Path();
    this.myPath.strokeColor = 'black';
    this.myPath.strokeWidth = 3;
    this.canDraw = true;
    this.socket.canDraw({draw: true});
  }

  draw(event){
    if(this.myDraw && this.canDraw){
    this.myPath.add(new Point(event.layerX, event.layerY));
    this.socket.sendSketch({x: event.layerX, y: event.layerY});
    console.log(new Point(event.layerX, event.layerY));
    }
  }

  endDraw(){
    this.canDraw = false;
    this.socket.canDraw({draw: false});
  }

  newArtist(){
    this.artistPath = new Path;
    this.artistPath = new Path();
  }

  clearDrawing(){
    this.socket.clearBoard(true);
  }

  clearBoard(clear){
    if(clear)this.project1.clear();
  }

  ngOnInit(): void {
    window['paper'] = paper;
    this.project1 = new Project('cv');
    this.myPath = new Path;
    this.artistPath = new Path;
    this.socket.canDraw$.subscribe(canDraw =>{
      if(canDraw){
        this.artistPath = new Path();
      }
    })
    this.socket.newSketch$.subscribe(point =>{
      this.artistPath.strokeColor = 'black';
      this.artistPath.strokeWidth = 3;
      this.artistPath.add(point.x, point.y);
      console.log(point);
    })
    this.socket.clearDraw$.subscribe(clear =>{
      this.clearBoard(clear);
    })
  }


}
