import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-creategame',
  templateUrl: './creategame.component.html',
  styleUrls: ['./creategame.component.scss']
})
export class CreategameComponent implements OnInit {
  rounds: any[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'},
  ];

  scores: any[] = [
    {value: 10, viewValue: '10'},
    {value: 20, viewValue: '20'},
    {value: 30, viewValue: '30'},
    {value: 40, viewValue: '40'},
    {value: 50, viewValue: '50'},
    {value: 60, viewValue: '60'},
    {value: 70, viewValue: '70'},
    {value: 80, viewValue: '80'},
    {value: 90, viewValue: '90'},
  ];

  constructor() { }

  ngOnInit(): void {  }

}
