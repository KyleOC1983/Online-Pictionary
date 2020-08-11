import { Component, OnInit } from '@angular/core';
import { Project, Path, Point } from 'paper'; 
import * as paper from 'paper';

@Component({
  selector: 'app-sketchpad',
  templateUrl: './sketchpad.component.html',
  styleUrls: ['./sketchpad.component.scss']
})
export class SketchpadComponent implements OnInit {

  
  myPath: any;
  project1: any;
  canDraw: boolean;


  constructor() { }

  startDraw(){
    this.myPath = new Path();
    this.myPath.strokeColor = 'black';
    this.myPath.strokeWidth = 3;
    this.canDraw = true;
  }

  draw(event){
    if(this.canDraw){
    this.myPath.add(new Point(event.layerX, event.layerY))
    }
  }

  endDraw(){
    this.canDraw = false;
  }

  clearDrawing(){
    this.project1.clear();
  }

  ngOnInit(): void {
    window['paper'] = paper;
    this.project1 = new Project('cv');
    this.myPath = new Path;
  }


}
