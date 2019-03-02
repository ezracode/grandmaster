import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService){}

  dato = '';
  title = 'chess';

  a1 = [{cvalue: String.fromCharCode(9814), cid: "11", cssclass: "white-piece", kind: "R"}];
  a2 = [{cvalue: String.fromCharCode(9817), cid: "21", cssclass: "white-piece", kind: "P"}];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = [{cvalue: String.fromCharCode(9823), cid: "31", cssclass: "black-piece", kind: "P"}];
  a8 = [{cvalue: String.fromCharCode(9820), cid: "41", cssclass: "black-piece", kind: "R"}];

  b1 = [{cvalue: String.fromCharCode(9816), cid: "12", cssclass: "white-piece", kind: "N"}];
  b2 = [{cvalue: String.fromCharCode(9817), cid: "22", cssclass: "white-piece", kind: "P"}];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = [{cvalue: String.fromCharCode(9823), cid: "32", cssclass: "black-piece", kind: "P"}];
  b8 = [{cvalue: String.fromCharCode(9822), cid: "42", cssclass: "black-piece", kind: "N"}];

  c1 = [{cvalue: String.fromCharCode(9815), cid: "13", cssclass: "white-piece", kind: "B"}];
  c2 = [{cvalue: String.fromCharCode(9817), cid: "23", cssclass: "white-piece", kind: "P"}];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = [{cvalue: String.fromCharCode(9823), cid: "33", cssclass: "black-piece", kind: "P"}];
  c8 = [{cvalue: String.fromCharCode(9821), cid: "43", cssclass: "black-piece", kind: "B"}];

  d1 = [{cvalue: String.fromCharCode(9813), cid: "14", cssclass: "white-piece", kind: "Q"}];
  d2 = [{cvalue: String.fromCharCode(9817), cid: "24", cssclass: "white-piece", kind: "P"}];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = [{cvalue: String.fromCharCode(9823), cid: "34", cssclass: "black-piece", kind: "P"}];
  d8 = [{cvalue: String.fromCharCode(9819), cid: "44", cssclass: "black-piece", kind: "Q"}];

  e1 = [{cvalue: String.fromCharCode(9812), cid: "15", cssclass: "white-piece", kind: "K"}];
  e2 = [{cvalue: String.fromCharCode(9817), cid: "25", cssclass: "white-piece", kind: "P"}];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = [{cvalue: String.fromCharCode(9823), cid: "35", cssclass: "black-piece", kind: "P"}];
  e8 = [{cvalue: String.fromCharCode(9818), cid: "45", cssclass: "black-piece", kind: "K"}];

  f1 = [{cvalue: String.fromCharCode(9815), cid: "16", cssclass: "white-piece", kind: "B"}];
  f2 = [{cvalue: String.fromCharCode(9817), cid: "26", cssclass: "white-piece", kind: "P"}];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = [{cvalue: String.fromCharCode(9823), cid: "36", cssclass: "black-piece", kind: "P"}];
  f8 = [{cvalue: String.fromCharCode(9821), cid: "46", cssclass: "black-piece", kind: "B"}];

  g1 = [{cvalue: String.fromCharCode(9816), cid: "17", cssclass: "white-piece", kind: "N"}];
  g2 = [{cvalue: String.fromCharCode(9817), cid: "27", cssclass: "white-piece", kind: "P"}];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = [{cvalue: String.fromCharCode(9823), cid: "37", cssclass: "black-piece", kind: "P"}];
  g8 = [{cvalue: String.fromCharCode(9822), cid: "47", cssclass: "black-piece", kind: "N"}];

  h1 = [{cvalue: String.fromCharCode(9814), cid: "18", cssclass: "white-piece", kind: "R"}];
  h2 = [{cvalue: String.fromCharCode(9817), cid: "28", cssclass: "white-piece", kind: "P"}];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = [{cvalue: String.fromCharCode(9823), cid: "38", cssclass: "black-piece", kind: "P"}];
  h8 = [{cvalue: String.fromCharCode(9820), cid: "48", cssclass: "black-piece", kind: "R"}];

  res = ""

  ngOnInit(){
      this.apiService.getGames().subscribe(res => {
              console.log(res)})    
      console.log("ngOnInit")  
    };

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer != event.container){
      while (event.container.data.length > 0){
        this.dato = event.container.data.pop()
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
