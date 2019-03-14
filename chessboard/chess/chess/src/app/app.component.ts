import {Component} from '@angular/core'
import {CdkDragStart, CdkDragDrop, transferArrayItem, CdkDragEnd} from '@angular/cdk/drag-drop'
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apiService: ApiService) {}

  dato = ''
  res = ""
  title = 'chess'
  currentName = ""
  previousName = ""
  currentPiece = {}

  cells = {
    a1: [{cvalue: String.fromCharCode(9814), cid: "11", cssclass: "white-piece", kind: "R"}],
    a2: [{cvalue: String.fromCharCode(9817), cid: "21", cssclass: "white-piece", kind: "P"}],
    a3: [],
    a4: [],
    a5: [],
    a6: [],
    a7: [{cvalue: String.fromCharCode(9823), cid: "31", cssclass: "black-piece", kind: "P"}],
    a8: [{cvalue: String.fromCharCode(9820), cid: "41", cssclass: "black-piece", kind: "R"}],

    b1: [{cvalue: String.fromCharCode(9816), cid: "12", cssclass: "white-piece", kind: "N"}],
    b2: [{cvalue: String.fromCharCode(9817), cid: "22", cssclass: "white-piece", kind: "P"}],
    b3: [],
    b4: [],
    b5: [],
    b6: [],
    b7: [{cvalue: String.fromCharCode(9823), cid: "32", cssclass: "black-piece", kind: "P"}],
    b8: [{cvalue: String.fromCharCode(9822), cid: "42", cssclass: "black-piece", kind: "N"}],

    c1: [{cvalue: String.fromCharCode(9815), cid: "13", cssclass: "white-piece", kind: "B"}],
    c2: [{cvalue: String.fromCharCode(9817), cid: "23", cssclass: "white-piece", kind: "P"}],
    c3: [],
    c4: [],
    c5: [],
    c6: [],
    c7: [{cvalue: String.fromCharCode(9823), cid: "33", cssclass: "black-piece", kind: "P"}],
    c8: [{cvalue: String.fromCharCode(9821), cid: "43", cssclass: "black-piece", kind: "B"}],

    d1: [{cvalue: String.fromCharCode(9813), cid: "14", cssclass: "white-piece", kind: "Q"}],
    d2: [{cvalue: String.fromCharCode(9817), cid: "24", cssclass: "white-piece", kind: "P"}],
    d3: [],
    d4: [],
    d5: [],
    d6: [],
    d7: [{cvalue: String.fromCharCode(9823), cid: "34", cssclass: "black-piece", kind: "P"}],
    d8: [{cvalue: String.fromCharCode(9819), cid: "44", cssclass: "black-piece", kind: "Q"}],

    e1: [{cvalue: String.fromCharCode(9812), cid: "15", cssclass: "white-piece", kind: "K"}],
    e2: [{cvalue: String.fromCharCode(9817), cid: "25", cssclass: "white-piece", kind: "P"}],
    e3: [],
    e4: [],
    e5: [],
    e6: [],
    e7: [{cvalue: String.fromCharCode(9823), cid: "35", cssclass: "black-piece", kind: "P"}],
    e8: [{cvalue: String.fromCharCode(9818), cid: "45", cssclass: "black-piece", kind: "K"}],

    f1: [{cvalue: String.fromCharCode(9815), cid: "16", cssclass: "white-piece", kind: "B"}],
    f2: [{cvalue: String.fromCharCode(9817), cid: "26", cssclass: "white-piece", kind: "P"}],
    f3: [],
    f4: [],
    f5: [],
    f6: [],
    f7: [{cvalue: String.fromCharCode(9823), cid: "36", cssclass: "black-piece", kind: "P"}],
    f8: [{cvalue: String.fromCharCode(9821), cid: "46", cssclass: "black-piece", kind: "B"}],

    g1: [{cvalue: String.fromCharCode(9816), cid: "17", cssclass: "white-piece", kind: "N"}],
    g2: [{cvalue: String.fromCharCode(9817), cid: "27", cssclass: "white-piece", kind: "P"}],
    g3: [],
    g4: [],
    g5: [],
    g6: [],
    g7: [{cvalue: String.fromCharCode(9823), cid: "37", cssclass: "black-piece", kind: "P"}],
    g8: [{cvalue: String.fromCharCode(9822), cid: "47", cssclass: "black-piece", kind: "N"}],

    h1: [{cvalue: String.fromCharCode(9814), cid: "18", cssclass: "white-piece", kind: "R"}],
    h2: [{cvalue: String.fromCharCode(9817), cid: "28", cssclass: "white-piece", kind: "P"}],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    h7: [{cvalue: String.fromCharCode(9823), cid: "38", cssclass: "black-piece", kind: "P"}],
    h8: [{cvalue: String.fromCharCode(9820), cid: "48", cssclass: "black-piece", kind: "R"}]
  }

  status = {
    a8: true, b8: true, c8: true, d8: true, e8: true, f8: true, g8: true, h8: true,
    a7: true, b7: true, c7: true, d7: true, e7: true, f7: true, g7: true, h7: true,
    a6: true, b6: true, c6: true, d6: true, e6: true, f6: true, g6: true, h6: true,
    a5: true, b5: true, c5: true, d5: true, e5: true, f5: true, g5: true, h5: true,
    a4: true, b4: true, c4: true, d4: true, e4: true, f4: true, g4: true, h4: true,
    a3: true, b3: true, c3: true, d3: true, e3: true, f3: true, g3: true, h3: true,
    a2: true, b2: true, c2: true, d2: true, e2: true, f2: true, g2: true, h2: true,
    a1: true, b1: true, c1: true, d1: true, e1: true, f1: true, g1: true, h1: true
  }

  ngOnInit() {
    //this.apiService.getGames().subscribe(res => {
    //        console.log(res)})    
    //console.log("ngOnInit")  
  }

  public ended(event: CdkDragEnd){
      console.log("ended method")
      this.status["a3"] = true
      this.status["a4"] = true
  }

  public started(event: CdkDragStart) {

    console.log("started method")  
    console.log(event.source.element.nativeElement.parentElement.getAttribute("name") )

    this.previousName = event.source.element.nativeElement.parentElement.getAttribute("name")
    this.currentPiece = this.cells[this.previousName][0]
    console.log(this.currentPiece["kind"])

    if (this.previousName == "a2") {
      this.status["a3"] = false
      this.status["a4"] = false
    }
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer != event.container) {
      this.previousName = event.previousContainer.element.nativeElement.getAttribute("name")
      this.currentName = event.container.element.nativeElement.getAttribute("name")
      console.log("drop method")
      console.log(this.currentName)
      console.log(this.previousName)
      console.log(this.cells[this.currentName])
      this.currentPiece = this.cells[this.currentName]
      console.log(this.currentPiece["cvalue"])
      //if (event.container.element.nativeElement.parentElement.getAttribute("name") == "da3" || 
      //   event.container.element.nativeElement.parentElement.getAttribute("name") == "da4") {
        this.status["a3"] = true
        this.status["a4"] = true
      //}
      while (event.container.data.length > 0){
        this.dato = event.container.data.pop()
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex)
    }
  }
}