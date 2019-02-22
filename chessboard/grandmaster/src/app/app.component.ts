import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { PieceComponent } from './piece/piece.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  dato = '';
  title = 'grandmaster';

  a1 = [{cvalue: String.fromCharCode(9814), cid:"11", cssclass:"white-piece"}];
  a2 = [{cvalue: String.fromCharCode(9817), cid:"21", cssclass:"white-piece"}];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = [{cvalue: String.fromCharCode(9823), cid: "31", cssclass: "black-piece"}];
  a8 = [{cvalue: String.fromCharCode(9820), cid: "41", cssclass: "black-piece"}];

  b1 = [{cvalue: String.fromCharCode(9816), cid: "12", cssclass: "white-piece"}];
  b2 = [{cvalue: String.fromCharCode(9817), cid: "22", cssclass: "white-piece"}];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = [{cvalue: String.fromCharCode(9823), cid: "32", cssclass: "black-piece"}];
  b8 = [{cvalue: String.fromCharCode(9822), cid: "42", cssclass: "black-piece"}];

  c1 = [{cvalue: String.fromCharCode(9815), cid: "13", cssclass: "white-piece"}];
  c2 = [{cvalue: String.fromCharCode(9817), cid: "23", cssclass: "white-piece"}];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = [{cvalue: String.fromCharCode(9823), cid: "33", cssclass: "black-piece"}];
  c8 = [{cvalue: String.fromCharCode(9821), cid: "43", cssclass: "black-piece"}];

  d1 = [{cvalue: String.fromCharCode(9813), cid: "14", cssclass: "white-piece"}];
  d2 = [{cvalue: String.fromCharCode(9817), cid: "24", cssclass: "white-piece"}];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = [{cvalue: String.fromCharCode(9823), cid: "34", cssclass: "black-piece"}];
  d8 = [{cvalue: String.fromCharCode(9819), cid: "44", cssclass: "black-piece"}];

  e1 = [{cvalue: String.fromCharCode(9812), cid: "15", cssclass: "white-piece"}];
  e2 = [{cvalue: String.fromCharCode(9817), cid: "25", cssclass: "white-piece"}];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = [{cvalue: String.fromCharCode(9823), cid: "35", cssclass: "black-piece"}];
  e8 = [{cvalue: String.fromCharCode(9818), cid: "45", cssclass: "black-piece"}];

  f1 = [{cvalue: String.fromCharCode(9815), cid: "16", cssclass: "white-piece"}];
  f2 = [{cvalue: String.fromCharCode(9817), cid: "26", cssclass: "white-piece"}];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = [{cvalue: String.fromCharCode(9823), cid: "36", cssclass: "black-piece"}];
  f8 = [{cvalue: String.fromCharCode(9821), cid: "46", cssclass: "black-piece"}];

  g1 = [{cvalue: String.fromCharCode(9816), cid: "17", cssclass: "white-piece"}];
  g2 = [{cvalue: String.fromCharCode(9817), cid: "27", cssclass: "white-piece"}];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = [{cvalue: String.fromCharCode(9823), cid: "37", cssclass: "black-piece"}];
  g8 = [{cvalue: String.fromCharCode(9823), cid: "47", cssclass: "black-piece"}];

  h1 = [{cvalue: String.fromCharCode(9814), cid: "18", cssclass: "white-piece"}];
  h2 = [{cvalue: String.fromCharCode(9817), cid: "28", cssclass: "white-piece"}];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = [{cvalue: String.fromCharCode(9823), cid: "38", cssclass: "black-piece"}];
  h8 = [{cvalue: String.fromCharCode(9820), cid: "48", cssclass: "black-piece"}];
  
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer != event.container){
      while (event.container.data.length > 0){
        this.dato = event.container.data.pop()
      }
 
      console.log(event.item)
      console.log(event.previousContainer.element.nativeElement )
      console.log(event.previousContainer.data)

      transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
    }
  }   
}