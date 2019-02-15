import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  dato = '';
  title = 'grandmaster';

  a1 = ['<p class="white-piece"><b>\u2656</b></p>'];
  a2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  a8 = ['<p class="black-piece"><b>\u265C</b></p>'];

  b1 = ['<p class="white-piece"><b>\u2658</b></p>'];
  b2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  b8 = ['<p class="black-piece"><b>\u265E</b></p>'];

  c1 = ['<p class="white-piece"><b>\u2657</b></p>'];
  c2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  c8 = ['<p class="black-piece"><b>\u265D</b></p>'];

  d1 = ['<p class="white-piece"><b>\u2655</b></p>'];
  d2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  d8 = ['<p class="black-piece"><b>\u265B</b></p>'];

  e1 = ['<p class="white-piece"><b>\u2654</b></p>'];
  e2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  e8 = ['<p class="black-piece"><b>\u265A</b></p>'];

  f1 = ['<p class="white-piece"><b>\u2657</b></p>'];
  f2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  f8 = ['<p class="black-piece"><b>\u265D</b></p>'];

  g1 = ['<p class="white-piece"><b>\u2658</b></p>'];
  g2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  g8 = ['<p class="black-piece"><b>\u265E</b></p>'];

  h1 = ['<p class="white-piece"><b>\u2656</b></p>'];
  h2 = ['<p class="white-piece"><b>\u2659</b></p>'];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = ['<p class="black-piece"><b>\u265F</b></p>'];
  h8 = ['<p class="black-piece"><b>\u265C</b></p>'];
  
  public drop(event: CdkDragDrop<string[]>) {
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