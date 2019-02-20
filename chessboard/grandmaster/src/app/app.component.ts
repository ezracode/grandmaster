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

  //a1 = ['<app-piece value=\u2656></app-piece>'];
  a1 = [String.fromCharCode(9814)];
  a2 = [String.fromCharCode(9817)];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = [String.fromCharCode(9823)];
  a8 = [String.fromCharCode(9820)];

  b1 = [String.fromCharCode(9816)];
  b2 = [String.fromCharCode(9817)];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = [String.fromCharCode(9823)];
  b8 = [String.fromCharCode(9822)];

  c1 = [String.fromCharCode(9815)];
  c2 = [String.fromCharCode(9817)];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = [String.fromCharCode(9823)];
  c8 = [String.fromCharCode(9821)];

  d1 = [String.fromCharCode(9813)];
  d2 = [String.fromCharCode(9817)];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = [String.fromCharCode(9823)];
  d8 = [String.fromCharCode(9819)];

  e1 = [String.fromCharCode(9812)];
  e2 = [String.fromCharCode(9817)];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = [String.fromCharCode(9823)];
  e8 = [String.fromCharCode(9818)];

  f1 = [String.fromCharCode(9815)];
  f2 = [String.fromCharCode(9817)];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = [String.fromCharCode(9823)];
  f8 = [String.fromCharCode(9821)];

  g1 = [String.fromCharCode(9816)];
  g2 = [String.fromCharCode(9817)];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = [String.fromCharCode(9823)];
  g8 = [String.fromCharCode(9822)];

  h1 = [String.fromCharCode(9814)];
  h2 = [String.fromCharCode(9817)];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = [String.fromCharCode(9823)];
  h8 = [String.fromCharCode(9820)];
  
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer != event.container){
      while (event.container.data.length > 0){
        this.dato = event.container.data.pop()
      }
 
      console.log(event.container.data)
      console.log(event.previousContainer.data)
      console.log(event.previousIndex)
      console.log(event.currentIndex)

      transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
    }
  }   
}