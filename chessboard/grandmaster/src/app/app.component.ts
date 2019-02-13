import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  dato = '';
  title = 'grandmaster';

  a1 = ['\u2656'];
  a2 = ['\u2659'];
  a3 = [''];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = ['\u265F'];
  a8 = ['\u265C'];

  b1 = ['\u2658'];
  b2 = ['\u2659'];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = ['\u265F'];
  b8 = ['\u265E'];

  c1 = ['\u2657'];
  c2 = ['\u2659'];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = ['\u265F'];
  c8 = ['\u265D'];

  d1 = ['\u2655'];
  d2 = ['\u2659'];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = ['\u265F'];
  d8 = ['\u265B'];

  e1 = ['\u2654'];
  e2 = ['\u2659'];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = ['\u265F'];
  e8 = ['\u265A'];

  f1 = ['\u2657'];
  f2 = ['\u2659'];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = ['\u265F'];
  f8 = ['\u265D'];

  g1 = ['\u2658'];
  g2 = ['\u2659'];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = ['\u265F'];
  g8 = ['\u265E'];

  h1 = ['\u2656'];
  h2 = ['\u2659'];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = ['\u265F'];
  h8 = ['\u265C'];
  
  public drop(event: CdkDragDrop<string[]>) {
    while (event.container.data.length > 0){
      this.dato = event.container.data.pop()
    }

    transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
  }   
}
