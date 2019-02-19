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

  a1 = ['<p id="11" class="white-piece"><b>\u2656</b></p>'];
  a2 = ['<p id="21" class="white-piece"><b>\u2659</b></p>'];
  a3 = [];
  a4 = [];
  a5 = [];
  a6 = [];
  a7 = ['<p id="31" class="black-piece"><b>\u265F</b></p>'];
  a8 = ['<p id="41" class="black-piece"><b>\u265C</b></p>'];

  b1 = ['<p id="12" class="white-piece"><b>\u2658</b></p>'];
  b2 = ['<p id="22" class="white-piece"><b>\u2659</b></p>'];
  b3 = [];
  b4 = [];
  b5 = [];
  b6 = [];
  b7 = ['<p id="32" class="black-piece"><b>\u265F</b></p>'];
  b8 = ['<p id="42" class="black-piece"><b>\u265E</b></p>'];

  c1 = ['<p id="13" class="white-piece"><b>\u2657</b></p>'];
  c2 = ['<p id="23" class="white-piece"><b>\u2659</b></p>'];
  c3 = [];
  c4 = [];
  c5 = [];
  c6 = [];
  c7 = ['<p id="33" class="black-piece"><b>\u265F</b></p>'];
  c8 = ['<p id="43" class="black-piece"><b>\u265D</b></p>'];

  d1 = ['<p id="14" class="white-piece"><b>\u2655</b></p>'];
  d2 = ['<p id="24" class="white-piece"><b>\u2659</b></p>'];
  d3 = [];
  d4 = [];
  d5 = [];
  d6 = [];
  d7 = ['<p id="34" class="black-piece"><b>\u265F</b></p>'];
  d8 = ['<p id="44" class="black-piece"><b>\u265B</b></p>'];

  e1 = ['<p id="15" class="white-piece"><b>\u2654</b></p>'];
  e2 = ['<p id="25" class="white-piece"><b>\u2659</b></p>'];
  e3 = [];
  e4 = [];
  e5 = [];
  e6 = [];
  e7 = ['<p id="35" class="black-piece"><b>\u265F</b></p>'];
  e8 = ['<p id="45" class="black-piece"><b>\u265A</b></p>'];

  f1 = ['<p id="16" class="white-piece"><b>\u2657</b></p>'];
  f2 = ['<p id="26" class="white-piece"><b>\u2659</b></p>'];
  f3 = [];
  f4 = [];
  f5 = [];
  f6 = [];
  f7 = ['<p id="36" class="black-piece"><b>\u265F</b></p>'];
  f8 = ['<p id="46" class="black-piece"><b>\u265D</b></p>'];

  g1 = ['<p id="17" class="white-piece"><b>\u2658</b></p>'];
  g2 = ['<p id="27" class="white-piece"><b>\u2659</b></p>'];
  g3 = [];
  g4 = [];
  g5 = [];
  g6 = [];
  g7 = ['<p id="37" class="black-piece"><b>\u265F</b></p>'];
  g8 = ['<p id="47" class="black-piece"><b>\u265E</b></p>'];

  h1 = ['<p id="18" class="white-piece"><b>\u2656</b></p>'];
  h2 = ['<p id="28" class="white-piece"><b>\u2659</b></p>'];
  h3 = [];
  h4 = [];
  h5 = [];
  h6 = [];
  h7 = ['<p id="38" class="black-piece"><b>\u265F</b></p>'];
  h8 = ['<p id="48" class="black-piece"><b>\u265C</b></p>'];
  
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