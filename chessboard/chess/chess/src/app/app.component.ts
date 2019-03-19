import {Component} from '@angular/core'
import {CdkDrag, CdkDragStart, CdkDragDrop, transferArrayItem, CdkDragEnd, CdkDropList} from '@angular/cdk/drag-drop'
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
  file = ""
  rank = ""

  files = ["a", "b", "c", "d", "e", "f", "g", "h"]

  whiteDiagonals = {
    d1: ["a2", "b1"],
    d2: ["a4", "b3", "c2", "d1"],
    d3: ["a6", "b5", "c4", "d3", "e2", "f1"],
    d4: ["a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"],
    d5: ["c8", "d7", "e6", "f5", "g4", "h3"],
    d6: ["e8", "f7", "g6", "h5"],
    d7: ["g8", "h7"],
    d8: ["a6", "b7", "c8"],
    d9: ["a4", "b5", "c6", "d7", "e8"],
    d10: ["a2", "b3", "c4", "d5", "e6", "f7", "g8"],
    d11: ["b1", "c2", "d3", "e4", "f5", "g6", "h7"],
    d12: ["d1", "e2", "f3", "g4", "h5"],
    d13: ["f1", "g2", "h3"]
  }

  blackDiagonals = {
      d1: ["a7", "b8"],
      d2: ["a5", "b6", "c7", "d8"],
      d3: ["a3", "b4", "c5", "d6", "e7", "f8"],
      d4: ["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"],
      d5: ["c1", "d2", "e3", "f4", "g5", "h6"],
      d6: ["e1", "f2", "g3", "h4"],
      d7: ["g1", "h2"],
      d8: ["a3", "b2", "c1"],
      d9: ["a5", "b4", "c3", "d2", "e1"],
      d10: ["a7", "b6", "c5", "d4", "e3", "f2", "g1"],
      d11: ["b8", "c7", "d6", "e5", "f4", "g3", "h2"],
      d12: ["d8", "e7", "f6", "g5", "h4"],
      d13: ["f8", "g7", "h6"]
  }

  public cells = {
    a1: [{cvalue: String.fromCharCode(9814), cid: "11", cssclass: "white-piece", kind: "R", currentPosition: "a1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white left rock", cellsToPaint: []}],
    a2: [{cvalue: String.fromCharCode(9817), cid: "21", cssclass: "white-piece", kind: "P", currentPosition: "a2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn left rock", cellsToPaint: []}],
    a3: [],
    a4: [],
    a5: [],
    a6: [],
    a7: [{cvalue: String.fromCharCode(9823), cid: "31", cssclass: "black-piece", kind: "P", currentPosition: "a7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn left rock", cellsToPaint: []}],
    a8: [{cvalue: String.fromCharCode(9820), cid: "41", cssclass: "black-piece", kind: "R", currentPosition: "a8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black left rock", cellsToPaint: []}],

    b1: [{cvalue: String.fromCharCode(9816), cid: "12", cssclass: "white-piece", kind: "N", currentPosition: "b1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white left knight", cellsToPaint: []}],
    b2: [{cvalue: String.fromCharCode(9817), cid: "22", cssclass: "white-piece", kind: "P", currentPosition: "b2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn left knight", cellsToPaint: []}],
    b3: [],
    b4: [],
    b5: [],
    b6: [],
    b7: [{cvalue: String.fromCharCode(9823), cid: "32", cssclass: "black-piece", kind: "P", currentPosition: "b7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn left knight", cellsToPaint: []}],
    b8: [{cvalue: String.fromCharCode(9822), cid: "42", cssclass: "black-piece", kind: "N", currentPosition: "b8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black left knight", cellsToPaint: []}],

    c1: [{cvalue: String.fromCharCode(9815), cid: "13", cssclass: "white-piece", kind: "B", currentPosition: "c1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white left bishop", cellsToPaint: []}],
    c2: [{cvalue: String.fromCharCode(9817), cid: "23", cssclass: "white-piece", kind: "P", currentPosition: "c2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn left bishop", cellsToPaint: []}],
    c3: [],
    c4: [],
    c5: [],
    c6: [],
    c7: [{cvalue: String.fromCharCode(9823), cid: "33", cssclass: "black-piece", kind: "P", currentPosition: "c7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn left bishop", cellsToPaint: []}],
    c8: [{cvalue: String.fromCharCode(9821), cid: "43", cssclass: "black-piece", kind: "B", currentPosition: "c8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black left bishop", cellsToPaint: []}],

    d1: [{cvalue: String.fromCharCode(9813), cid: "14", cssclass: "white-piece", kind: "Q", currentPosition: "d1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white queen", cellsToPaint: []}],
    d2: [{cvalue: String.fromCharCode(9817), cid: "24", cssclass: "white-piece", kind: "P", currentPosition: "d2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn queen", cellsToPaint: []}],
    d3: [],
    d4: [],
    d5: [],
    d6: [],
    d7: [{cvalue: String.fromCharCode(9823), cid: "34", cssclass: "black-piece", kind: "P", currentPosition: "d7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn queen", cellsToPaint: []}],
    d8: [{cvalue: String.fromCharCode(9819), cid: "44", cssclass: "black-piece", kind: "Q", currentPosition: "d8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black queen", cellsToPaint: []}],

    e1: [{cvalue: String.fromCharCode(9812), cid: "15", cssclass: "white-piece", kind: "K", currentPosition: "e1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white king", cellsToPaint: []}],
    e2: [{cvalue: String.fromCharCode(9817), cid: "25", cssclass: "white-piece", kind: "P", currentPosition: "e2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn king", cellsToPaint: []}],
    e3: [],
    e4: [],
    e5: [],
    e6: [],
    e7: [{cvalue: String.fromCharCode(9823), cid: "35", cssclass: "black-piece", kind: "P", currentPosition: "e7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn king", cellsToPaint: []}],
    e8: [{cvalue: String.fromCharCode(9818), cid: "45", cssclass: "black-piece", kind: "K", currentPosition: "e8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black king", cellsToPaint: []}],

    f1: [{cvalue: String.fromCharCode(9815), cid: "16", cssclass: "white-piece", kind: "B", currentPosition: "f1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white right bishop", cellsToPaint: []}],
    f2: [{cvalue: String.fromCharCode(9817), cid: "26", cssclass: "white-piece", kind: "P", currentPosition: "f2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn right bishop", cellsToPaint: []}],
    f3: [],
    f4: [],
    f5: [],
    f6: [],
    f7: [{cvalue: String.fromCharCode(9823), cid: "36", cssclass: "black-piece", kind: "P", currentPosition: "f7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn right bishop", cellsToPaint: []}],
    f8: [{cvalue: String.fromCharCode(9821), cid: "46", cssclass: "black-piece", kind: "B", currentPosition: "f8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black right bishop", cellsToPaint: []}],

    g1: [{cvalue: String.fromCharCode(9816), cid: "17", cssclass: "white-piece", kind: "N", currentPosition: "g1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white right knight", cellsToPaint: []}],
    g2: [{cvalue: String.fromCharCode(9817), cid: "27", cssclass: "white-piece", kind: "P", currentPosition: "g2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn right knight", cellsToPaint: []}],
    g3: [],
    g4: [],
    g5: [],
    g6: [],
    g7: [{cvalue: String.fromCharCode(9823), cid: "37", cssclass: "black-piece", kind: "P", currentPosition: "g7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn right knight", cellsToPaint: []}],
    g8: [{cvalue: String.fromCharCode(9822), cid: "47", cssclass: "black-piece", kind: "N", currentPosition: "g8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black right knight", cellsToPaint: []}],

    h1: [{cvalue: String.fromCharCode(9814), cid: "18", cssclass: "white-piece", kind: "R", currentPosition: "h1", previousPosition: "", counterOfMoves: 0, color: "W", named: "white right rock", cellsToPaint: []}],
    h2: [{cvalue: String.fromCharCode(9817), cid: "28", cssclass: "white-piece", kind: "P", currentPosition: "h2", previousPosition: "", counterOfMoves: 0, color: "W", named: "white pawn right rock", cellsToPaint: []}],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    h7: [{cvalue: String.fromCharCode(9823), cid: "38", cssclass: "black-piece", kind: "P", currentPosition: "h7", previousPosition: "", counterOfMoves: 0, color: "B", named: "black right rock", cellsToPaint: []}],
    h8: [{cvalue: String.fromCharCode(9820), cid: "48", cssclass: "black-piece", kind: "R", currentPosition: "h8", previousPosition: "", counterOfMoves: 0, color: "B", named: "black pawn right rock", cellsToPaint: []}]
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

  pieceAlive = {
    c11: {alive: true, currentKind: "R"},
    c12: {alive: true, currentKind: "N"},
    c13: {alive: true, currentKind: "B"},
    c14: {alive: true, currentKind: "Q"},
    c15: {alive: true, currentKind: "K"},
    c16: {alive: true, currentKind: "B"},
    c17: {alive: true, currentKind: "N"},
    c18: {alive: true, currentKind: "R"},
    c21: {alive: true, currentKind: "P", previousKind: ""},
    c22: {alive: true, currentKind: "P", previousKind: ""},
    c23: {alive: true, currentKind: "P", previousKind: ""},
    c24: {alive: true, currentKind: "P", previousKind: ""},
    c25: {alive: true, currentKind: "P", previousKind: ""},
    c26: {alive: true, currentKind: "P", previousKind: ""},
    c27: {alive: true, currentKind: "P", previousKind: ""},
    c28: {alive: true, currentKind: "P", previousKind: ""},
    c31: {alive: true, currentKind: "P", previousKind: ""},
    c32: {alive: true, currentKind: "P", previousKind: ""},
    c33: {alive: true, currentKind: "P", previousKind: ""},
    c34: {alive: true, currentKind: "P", previousKind: ""},
    c35: {alive: true, currentKind: "P", previousKind: ""},
    c36: {alive: true, currentKind: "P", previousKind: ""},
    c37: {alive: true, currentKind: "P", previousKind: ""},
    c38: {alive: true, currentKind: "P", previousKind: ""},
    c41: {alive: true, currentKind: "R"},
    c42: {alive: true, currentKind: "N"},
    c43: {alive: true, currentKind: "B"},
    c44: {alive: true, currentKind: "Q"},
    c45: {alive: true, currentKind: "K"},
    c46: {alive: true, currentKind: "B"},
    c47: {alive: true, currentKind: "N"},
    c48: {alive: true, currentKind: "R"},
  }

  ngOnInit() {
    //this.apiService.getGames().subscribe(res => {
    //        console.log(res)})    
    //console.log("ngOnInit")  
  }

  colorOfCell(file: string, rank: string) {
    //file is a letter, rank is a number
    //file even and rank even black - columna impar fila impar negro
    //file even and rank odd  white - columna impar fila par   blanco
    //file odd  and rank even white - columna par   fila impar blanco
    //file odd  and rank odd  black - columna par   fila par   negro

    var oddFiles = ["a", "c", "e", "g"]
    var found = oddFiles.find(function(element) {
      return element == file;
    });

    if (found) {
      if( ((+rank) % 2) != 0 ) {
          return ("B")
      } else {
          return ("W")
      }
    } else {
        if( ((+rank) % 2) != 0 ) {
            return ("W")
        } else {
            return ("B")
        }
    }
  }
    
  public allowdrop(item: CdkDrag, listItem: CdkDropList) {
    //console.log("alowdrop")

    var found = item.data["cellsToPaint"].find(function(element) {
      return element == listItem.element.nativeElement.getAttribute("name");
    });
    
    if (found != undefined) {
      return true
    } else {
      return false
    }
  }

  public ended(event: CdkDragEnd) {
    console.log("ended method")
    this.currentName = event.source.element.nativeElement.getAttribute("name")
    this.currentPiece = this.cells[this.previousName][0]
    for (let item of this.currentPiece["cellsToPaint"]) {
      this.status[item] = true
    }
  }

  public started(event: CdkDragStart) {

    console.log("started method")  
    console.log(event.source.element.nativeElement.parentElement.getAttribute("name") )

    this.previousName = event.source.element.nativeElement.parentElement.getAttribute("name")
    this.currentPiece = this.cells[this.previousName][0]
    console.log(this.currentPiece["kind"])
    this.file = this.currentPiece["currentPosition"]
    this.rank = this.currentPiece["currentPosition"]
    this.file = this.file.substring(0,1)
    this.rank = this.rank.substring(1,2) 
   
    var currentPosition = ""
    currentPosition = this.currentPiece["currentPosition"]

    var lrank = 0
    var tempCell = ""

    var tempCellDiagonal = []

    var tempCellLeft = []
    var tempCellCenter = []
    var tempCellRight = []
 
    var tempCellLeftUp1 = []
    var tempCellLeftUp2 = []
    var tempCellRightUp1 = []
    var tempCellRightUp2 = []
    var tempCellRightDown1 = []
    var tempCellRightDown2 = []
    var tempCellLeftDown1 = []
    var tempCellLeftDown2 = []

    var colorOfCurrentCell = ""
    var diagonals = {}

    this.currentPiece["cellsToPaint"] = []

    if (this.currentPiece["kind"] == "P") {
      lrank = +this.rank
      
      if (this.currentPiece["color"] == "W") {
        lrank++
        
        tempCell = this.file.concat(lrank.toString())
        tempCellCenter = this.cells[tempCell]
        if (tempCellCenter.length == 0) {
          this.currentPiece["cellsToPaint"].push(this.file.concat(lrank.toString()))
        }
                  
        if (this.file != "a") {
          //searching at the left of the current posicion
          tempCell = this.files[this.files.indexOf(this.file) - 1]
          tempCell = tempCell.concat(lrank.toString())
          tempCellLeft = this.cells[tempCell]
          if (tempCellLeft.length != 0) {
            if (tempCellLeft[0].color == "B") {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          }
          if (+this.rank == 5) {
            tempCell = this.files[this.files.indexOf(this.file) - 1]
            tempCell = tempCell.concat((lrank - 1).toString())
            tempCellLeft = this.cells[tempCell]
            if (tempCellLeft.length != 0) {
              if (tempCellLeft[0].color == "B") {
                tempCell = this.files[this.files.indexOf(this.file) - 1]
                tempCell = tempCell.concat((lrank).toString())
                this.currentPiece["cellsToPaint"].push(tempCell)
              }
            }
          }
        } 

        if (this.file != "h") {
          //searching at the right of the position
          tempCell = this.files[this.files.indexOf(this.file) + 1]
          console.log("derecha")
          tempCell = tempCell.concat(lrank.toString())
          console.log(tempCell)
          tempCellRight = this.cells[tempCell]
          if (tempCellRight.length != 0) {
            if (tempCellRight[0].color == "B") {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          }
          if (+this.rank == 5) {
            tempCell = this.files[this.files.indexOf(this.file) + 1]
            tempCell = tempCell.concat((lrank - 1).toString())
            tempCellLeft = this.cells[tempCell]
            if (tempCellLeft.length != 0) {
              if (tempCellLeft[0].color == "B") {
                tempCell = this.files[this.files.indexOf(this.file) + 1]
                tempCell = tempCell.concat((lrank).toString())
                this.currentPiece["cellsToPaint"].push(tempCell)
              }
            }
          }
        }  
      } else {
        lrank--  
        tempCell = this.file.concat(lrank.toString())
        tempCellCenter = this.cells[tempCell]
        if (tempCellCenter.length == 0){
          this.currentPiece["cellsToPaint"].push(this.file.concat(lrank.toString()))
        }
                  
        if (this.file != "a") {
          //searching at the left of the current posicion
          tempCell = this.files[this.files.indexOf(this.file) - 1]
          tempCell = tempCell.concat(lrank.toString())
          tempCellLeft = this.cells[tempCell]
          if (tempCellLeft.length != 0) {
            if (tempCellLeft[0].color == "W") {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          }
          if (+this.rank == 4) {
            tempCell = this.files[this.files.indexOf(this.file) - 1]
            tempCell = tempCell.concat((lrank + 1).toString())
            tempCellLeft = this.cells[tempCell]
            if (tempCellLeft.length != 0) {
              if (tempCellLeft[0].color == "W") {
                tempCell = this.files[this.files.indexOf(this.file) - 1]
                tempCell = tempCell.concat((lrank).toString())
                this.currentPiece["cellsToPaint"].push(tempCell)
              }
            }
          }
        } 

        if (this.file != "h") {
          //searching at the right of the current posicion
          tempCell = this.files[this.files.indexOf(this.file) + 1]
          tempCell = tempCell.concat(lrank.toString())
          tempCellRight = this.cells[tempCell]
          if (tempCellRight.length != 0) {
            if (tempCellRight[0].color == "W") {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          }
          if (+this.rank == 4) {
            tempCell = this.files[this.files.indexOf(this.file) + 1]
            tempCell = tempCell.concat((lrank + 1).toString())
            tempCellLeft = this.cells[tempCell]
            if (tempCellLeft.length != 0) {
              if (tempCellLeft[0].color == "W") {
                tempCell = this.files[this.files.indexOf(this.file) + 1]
                tempCell = tempCell.concat((lrank).toString())
                this.currentPiece["cellsToPaint"].push(tempCell)
              }
            }
          }
        }  
      }

      if (this.currentPiece["counterOfMoves"] == 0) {
        if (this.currentPiece["color"] == "W") {
          lrank++
        } else {
          lrank--
        }

        tempCell = this.file.concat(lrank.toString())
        tempCellCenter = this.cells[tempCell]
        if (tempCellCenter.length == 0){
          this.currentPiece["cellsToPaint"].push(this.file.concat(lrank.toString()))
        }
      }

      console.log("cell to paint")
      console.log(this.currentPiece["cellsToPaint"])
    } else if (this.currentPiece["kind"] == "R") {
    } else if (this.currentPiece["kind"] == "N") {
      lrank = +this.rank

      if ((this.files[this.files.indexOf(this.file) - 2] != undefined) &&
         (lrank + 1 < 9)){
          tempCell = this.files[this.files.indexOf(this.file) - 2]
          tempCell = tempCell.concat((lrank + 1).toString())
          tempCellLeftUp1 = this.cells[tempCell]
          if (tempCellLeftUp1.length != 0) {
            if (tempCellLeftUp1[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) - 1] != undefined) &&
         (lrank + 2 < 9)){
          tempCell = this.files[this.files.indexOf(this.file) - 1]
          tempCell = tempCell.concat((lrank + 2).toString())
          tempCellLeftUp2 = this.cells[tempCell]
          if (tempCellLeftUp2.length != 0) {
            if (tempCellLeftUp2[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) + 1] != undefined) &&
         (lrank + 2 < 9)){
          tempCell = this.files[this.files.indexOf(this.file) + 1]
          tempCell = tempCell.concat((lrank + 2).toString())
          tempCellRightUp1 = this.cells[tempCell]
          if (tempCellRightUp1.length != 0) {
            if (tempCellRightUp1[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) + 2] != undefined) &&
         (lrank + 1 < 9)){
          tempCell = this.files[this.files.indexOf(this.file) + 2]
          tempCell = tempCell.concat((lrank + 1).toString())
          tempCellRightUp2 = this.cells[tempCell]
          if (tempCellRightUp2.length != 0) {
            if (tempCellRightUp2[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) + 2] != undefined) &&
         (lrank - 1 > 0)){
          tempCell = this.files[this.files.indexOf(this.file) + 2]
          tempCell = tempCell.concat((lrank - 1).toString())
          tempCellRightDown1 = this.cells[tempCell]
          if (tempCellRightDown1.length != 0) {
            if (tempCellRightDown1[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) + 1] != undefined) &&
         (lrank - 2 > 0)){
          tempCell = this.files[this.files.indexOf(this.file) + 1]
          tempCell = tempCell.concat((lrank - 2).toString())
          tempCellRightDown2 = this.cells[tempCell]
          if (tempCellRightDown2.length != 0) {
            if (tempCellRightDown2[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) - 1] != undefined) &&
         (lrank - 2 > 0)){
          tempCell = this.files[this.files.indexOf(this.file) - 1]
          tempCell = tempCell.concat((lrank - 2).toString())
          tempCellLeftDown1 = this.cells[tempCell]
          if (tempCellLeftDown1.length != 0) {
            if (tempCellLeftDown1[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      if ((this.files[this.files.indexOf(this.file) - 2] != undefined) &&
         (lrank - 1 > 0)){
          tempCell = this.files[this.files.indexOf(this.file) - 2]
          tempCell = tempCell.concat((lrank - 1).toString())
          tempCellLeftDown2 = this.cells[tempCell]
          if (tempCellLeftDown2.length != 0) {
            if (tempCellLeftDown2[0].color != this.currentPiece["color"]) {
              this.currentPiece["cellsToPaint"].push(tempCell)
            }
          } else {
            this.currentPiece["cellsToPaint"].push(tempCell)
          }
      }

      console.log("cell to paint")
      console.log(this.currentPiece["cellsToPaint"])

    } else if (this.currentPiece["kind"] == "B") {
      console.log("bishop")
      lrank = +this.rank
      colorOfCurrentCell = this.colorOfCell(this.file, this.rank)

      if (colorOfCurrentCell == "W") {
        diagonals = this.whiteDiagonals
      } else {
        diagonals = this.blackDiagonals
      }

      for (let subset in diagonals) {
        // in because is an object
        var found = diagonals[subset].find(function(element) {
          return element == currentPosition;
        });

        if (found) {
          console.log(diagonals[subset])
          for (let item of diagonals[subset]) {
            if (item != this.currentPiece["currentPosition"]) { 
              console.log(item)
              // of because is an array
              tempCellDiagonal = this.cells[item]
              if (tempCellDiagonal.length != 0) {
                if (tempCellDiagonal[0].color != this.currentPiece["color"]) {
                  this.currentPiece["cellsToPaint"].push(item)
                }
                break
              } else {
                this.currentPiece["cellsToPaint"].push(item)
              } 
            }
          }
        }
      }
    } else if (this.currentPiece["kind"] == "Q") {
    } else if (this.currentPiece["kind"] == "K") {
    } 

    for (let item of this.currentPiece["cellsToPaint"]) {
      this.status[item] = false
    }
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer != event.container) {
      this.previousName = event.previousContainer.element.nativeElement.getAttribute("name")
      this.currentName = event.container.element.nativeElement.getAttribute("name")
      //console.log("drop method")
      //console.log(this.currentName)
      //console.log(this.previousName)
      //console.log(this.cells[this.currentName])
      this.currentPiece = this.cells[this.previousName][0]
      //console.log(this.currentPiece["cvalue"])

      this.currentPiece["counterOfMoves"]++
      this.currentPiece["previousPosition"] = this.previousName
      this.currentPiece["currentPosition"] = this.currentName
      this.cells[this.currentName][0] = this.currentPiece 

      while (event.container.data.length > 0) {
        this.dato = event.container.data.pop()
      }
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex)
    }
  }
}