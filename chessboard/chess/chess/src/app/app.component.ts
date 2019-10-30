import { Component } from '@angular/core';
import { CdkDrag, CdkDragStart, CdkDragDrop, transferArrayItem, CdkDragEnd, CdkDropList } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelectModule } from '@angular/material';
import { PortalHostDirective } from '@angular/cdk/portal';

interface Piece {
  value: string;
  kind: string;
}

interface GameMove {
  turn: number;
  white: string;
  black: string;
}

interface DataToPromote {
  turn: number;
  piece: string;
  currentCell: string;
  setOfPieces: Array<Piece>;
  selected: string;
  pieceColor: string;
}

const ELEMENT_DATA: GameMove[] = [];

class Turn {
  turnNumber: number;
  piece: {};
}

export class GameDataSource extends DataSource<GameMove> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<GameMove[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<GameMove[]> {
    return this.data;
  }

  disconnect() {}
}

@Component({
  selector: 'app-promote-dialog',
  templateUrl: 'promote-dialog.html'
})
export class PromoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PromoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataToPromote) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.whiteTurn = false;
    this.turnNumber = 0;
    this.currentMove = {turn: 0, white: '', black: ''};
    this.gameMoves = new GameDataSource();
    this.disablePiece(this.whiteTurn);
    this.cellOfLastMove = [];
    console.log(this.whiteTurn);
  }

  promote = '';
  dato = '';
  res = '';
  title = 'chess';
  currentName = '';
  previousName = '';
  clickedName = '';
  samePieceClicked = false;
  currentPiece = {};
  currentCellsToPaint = [];
  file = '';
  rank = '';
  whiteTurn = false;
  maxLimit = 9;
  minLimit = 0;
  whiteEnPassantMove = '';
  whiteEnPassantOpponentPosition = '';
  blackEnPassantMove = '';
  blackEnPassantOpponentPosition = '';
  whiteEnPassantRank = 5;
  blackEnPassantRank = 4;
  whiteShortCastlingMove = '';
  whiteLongCastlingMove = '';
  blackShortCastlingMove = '';
  blackLongCastlingMove = '';

  turnNumber = 0;
  blackMoves: Array<Turn> = [];
  whiteMoves: Array<Turn> = [];
  currentTurn: Turn = {turnNumber: 0, piece: {}};
  currentMove: GameMove = {turn: 0, white: '', black: ''};

  displayedColumns: string[] = ['turn', 'white', 'black'];
  gameMoves: GameDataSource;

  cellOfLastMove = [];

  files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  whiteDiagonals = {
    d1: ['a2', 'b1'],
    d2: ['a4', 'b3', 'c2', 'd1'],
    d3: ['a6', 'b5', 'c4', 'd3', 'e2', 'f1'],
    d4: ['a8', 'b7', 'c6', 'd5', 'e4', 'f3', 'g2', 'h1'],
    d5: ['c8', 'd7', 'e6', 'f5', 'g4', 'h3'],
    d6: ['e8', 'f7', 'g6', 'h5'],
    d7: ['g8', 'h7'],
    d8: ['a6', 'b7', 'c8'],
    d9: ['a4', 'b5', 'c6', 'd7', 'e8'],
    d10: ['a2', 'b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
    d11: ['b1', 'c2', 'd3', 'e4', 'f5', 'g6', 'h7'],
    d12: ['d1', 'e2', 'f3', 'g4', 'h5'],
    d13: ['f1', 'g2', 'h3']
  };

  blackDiagonals = {
      d1: ['a7', 'b8'],
      d2: ['a5', 'b6', 'c7', 'd8'],
      d3: ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'],
      d4: ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
      d5: ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'],
      d6: ['e1', 'f2', 'g3', 'h4'],
      d7: ['g1', 'h2'],
      d8: ['a3', 'b2', 'c1'],
      d9: ['a5', 'b4', 'c3', 'd2', 'e1'],
      d10: ['a7', 'b6', 'c5', 'd4', 'e3', 'f2', 'g1'],
      d11: ['b8', 'c7', 'd6', 'e5', 'f4', 'g3', 'h2'],
      d12: ['d8', 'e7', 'f6', 'g5', 'h4'],
      d13: ['f8', 'g7', 'h6']
  };

  public whitePieces: Array<Piece> = [
    {value: String.fromCharCode(9813), kind: 'Q'},
    {value: String.fromCharCode(9814), kind: 'R'},
    {value: String.fromCharCode(9816), kind: 'N'},
    {value: String.fromCharCode(9815), kind: 'B'}
  ];

  public blackPieces: Array<Piece> = [
    {value: String.fromCharCode(9819), kind: 'Q'},
    {value: String.fromCharCode(9820), kind: 'R'},
    {value: String.fromCharCode(9822), kind: 'N'},
    {value: String.fromCharCode(9821), kind: 'B'}
  ];

  public cells = {
    a1: [{cvalue: String.fromCharCode(9814), cid: 'c11', cssclass: 'white-piece', kind: 'R', currentPosition: 'a1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white left rock', cellsToPaint: [], disabled: this.whiteTurn}],
    a2: [{cvalue: String.fromCharCode(9817), cid: 'c21', cssclass: 'white-piece', kind: 'P', currentPosition: 'a2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn left rock', cellsToPaint: [], disabled: this.whiteTurn}],
    a3: [],
    a4: [],
    a5: [],
    a6: [],
    a7: [{cvalue: String.fromCharCode(9823), cid: 'c31', cssclass: 'black-piece', kind: 'P', currentPosition: 'a7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn left rock', cellsToPaint: [], disabled: !this.whiteTurn}],
    a8: [{cvalue: String.fromCharCode(9820), cid: 'c41', cssclass: 'black-piece', kind: 'R', currentPosition: 'a8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black left rock', cellsToPaint: [], disabled: !this.whiteTurn}],

    b1: [{cvalue: String.fromCharCode(9816), cid: 'c12', cssclass: 'white-piece', kind: 'N', currentPosition: 'b1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white left knight', cellsToPaint: [], disabled: this.whiteTurn}],
    b2: [{cvalue: String.fromCharCode(9817), cid: 'c22', cssclass: 'white-piece', kind: 'P', currentPosition: 'b2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn left knight', cellsToPaint: [], disabled: this.whiteTurn}],
    b3: [],
    b4: [],
    b5: [],
    b6: [],
    b7: [{cvalue: String.fromCharCode(9823), cid: 'c32', cssclass: 'black-piece', kind: 'P', currentPosition: 'b7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn left knight', cellsToPaint: [], disabled: !this.whiteTurn}],
    b8: [{cvalue: String.fromCharCode(9822), cid: 'c42', cssclass: 'black-piece', kind: 'N', currentPosition: 'b8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black left knight', cellsToPaint: [], disabled: !this.whiteTurn}],

    c1: [{cvalue: String.fromCharCode(9815), cid: 'c13', cssclass: 'white-piece', kind: 'B', currentPosition: 'c1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white left bishop', cellsToPaint: [], disabled: this.whiteTurn}],
    c2: [{cvalue: String.fromCharCode(9817), cid: 'c23', cssclass: 'white-piece', kind: 'P', currentPosition: 'c2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn left bishop', cellsToPaint: [], disabled: this.whiteTurn}],
    c3: [],
    c4: [],
    c5: [],
    c6: [],
    c7: [{cvalue: String.fromCharCode(9823), cid: 'c33', cssclass: 'black-piece', kind: 'P', currentPosition: 'c7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn left bishop', cellsToPaint: [], disabled: !this.whiteTurn}],
    c8: [{cvalue: String.fromCharCode(9821), cid: 'c43', cssclass: 'black-piece', kind: 'B', currentPosition: 'c8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black left bishop', cellsToPaint: [], disabled: !this.whiteTurn}],

    d1: [{cvalue: String.fromCharCode(9813), cid: 'c14', cssclass: 'white-piece', kind: 'Q', currentPosition: 'd1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white queen', cellsToPaint: [], disabled: this.whiteTurn}],
    d2: [{cvalue: String.fromCharCode(9817), cid: 'c24', cssclass: 'white-piece', kind: 'P', currentPosition: 'd2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn queen', cellsToPaint: [], disabled: this.whiteTurn}],
    d3: [],
    d4: [],
    d5: [],
    d6: [],
    d7: [{cvalue: String.fromCharCode(9823), cid: 'c34', cssclass: 'black-piece', kind: 'P', currentPosition: 'd7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn queen', cellsToPaint: [], disabled: !this.whiteTurn}],
    d8: [{cvalue: String.fromCharCode(9819), cid: 'c44', cssclass: 'black-piece', kind: 'Q', currentPosition: 'd8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black queen', cellsToPaint: [], disabled: !this.whiteTurn}],

    e1: [{cvalue: String.fromCharCode(9812), cid: 'c15', cssclass: 'white-piece', kind: 'K', currentPosition: 'e1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white king', cellsToPaint: [], disabled: this.whiteTurn}],
    e2: [{cvalue: String.fromCharCode(9817), cid: 'c25', cssclass: 'white-piece', kind: 'P', currentPosition: 'e2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn king', cellsToPaint: [], disabled: this.whiteTurn}],
    e3: [],
    e4: [],
    e5: [],
    e6: [],
    e7: [{cvalue: String.fromCharCode(9823), cid: 'c35', cssclass: 'black-piece', kind: 'P', currentPosition: 'e7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn king', cellsToPaint: [], disabled: !this.whiteTurn}],
    e8: [{cvalue: String.fromCharCode(9818), cid: 'c45', cssclass: 'black-piece', kind: 'K', currentPosition: 'e8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black king', cellsToPaint: [], disabled: !this.whiteTurn}],

    f1: [{cvalue: String.fromCharCode(9815), cid: 'c16', cssclass: 'white-piece', kind: 'B', currentPosition: 'f1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white right bishop', cellsToPaint: [], disabled: this.whiteTurn}],
    f2: [{cvalue: String.fromCharCode(9817), cid: 'c26', cssclass: 'white-piece', kind: 'P', currentPosition: 'f2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn right bishop', cellsToPaint: [], disabled: this.whiteTurn}],
    f3: [],
    f4: [],
    f5: [],
    f6: [],
    f7: [{cvalue: String.fromCharCode(9823), cid: 'c36', cssclass: 'black-piece', kind: 'P', currentPosition: 'f7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn right bishop', cellsToPaint: [], disabled: !this.whiteTurn}],
    f8: [{cvalue: String.fromCharCode(9821), cid: 'c46', cssclass: 'black-piece', kind: 'B', currentPosition: 'f8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black right bishop', cellsToPaint: [], disabled: !this.whiteTurn}],

    g1: [{cvalue: String.fromCharCode(9816), cid: 'c17', cssclass: 'white-piece', kind: 'N', currentPosition: 'g1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white right knight', cellsToPaint: [], disabled: this.whiteTurn}],
    g2: [{cvalue: String.fromCharCode(9817), cid: 'c27', cssclass: 'white-piece', kind: 'P', currentPosition: 'g2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn right knight', cellsToPaint: [], disabled: this.whiteTurn}],
    g3: [],
    g4: [],
    g5: [],
    g6: [],
    g7: [{cvalue: String.fromCharCode(9823), cid: 'c37', cssclass: 'black-piece', kind: 'P', currentPosition: 'g7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn right knight', cellsToPaint: [], disabled: !this.whiteTurn}],
    g8: [{cvalue: String.fromCharCode(9822), cid: 'c47', cssclass: 'black-piece', kind: 'N', currentPosition: 'g8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black right knight', cellsToPaint: [], disabled: !this.whiteTurn}],

    h1: [{cvalue: String.fromCharCode(9814), cid: 'c18', cssclass: 'white-piece', kind: 'R', currentPosition: 'h1', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white right rock', cellsToPaint: [], disabled: this.whiteTurn}],
    h2: [{cvalue: String.fromCharCode(9817), cid: 'c28', cssclass: 'white-piece', kind: 'P', currentPosition: 'h2', previousPosition: '',
          counterOfMoves: 0, color: 'W', named: 'white pawn right rock', cellsToPaint: [], disabled: this.whiteTurn}],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    h7: [{cvalue: String.fromCharCode(9823), cid: 'c38', cssclass: 'black-piece', kind: 'P', currentPosition: 'h7', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black right rock', cellsToPaint: [], disabled: !this.whiteTurn}],
    h8: [{cvalue: String.fromCharCode(9820), cid: 'c48', cssclass: 'black-piece', kind: 'R', currentPosition: 'h8', previousPosition: '',
          counterOfMoves: 0, color: 'B', named: 'black pawn right rock', cellsToPaint: [], disabled: !this.whiteTurn}]
  };

  colorOfCurrentMove = {
    a8: false, b8: false, c8: false, d8: false, e8: false, f8: false, g8: false, h8: false,
    a7: false, b7: false, c7: false, d7: false, e7: false, f7: false, g7: false, h7: false,
    a6: false, b6: false, c6: false, d6: false, e6: false, f6: false, g6: false, h6: false,
    a5: false, b5: false, c5: false, d5: false, e5: false, f5: false, g5: false, h5: false,
    a4: false, b4: false, c4: false, d4: false, e4: false, f4: false, g4: false, h4: false,
    a3: false, b3: false, c3: false, d3: false, e3: false, f3: false, g3: false, h3: false,
    a2: false, b2: false, c2: false, d2: false, e2: false, f2: false, g2: false, h2: false,
    a1: false, b1: false, c1: false, d1: false, e1: false, f1: false, g1: false, h1: false
  };

  colorOfCurrentMoveCanBeCaptured = {
    a8: false, b8: false, c8: false, d8: false, e8: false, f8: false, g8: false, h8: false,
    a7: false, b7: false, c7: false, d7: false, e7: false, f7: false, g7: false, h7: false,
    a6: false, b6: false, c6: false, d6: false, e6: false, f6: false, g6: false, h6: false,
    a5: false, b5: false, c5: false, d5: false, e5: false, f5: false, g5: false, h5: false,
    a4: false, b4: false, c4: false, d4: false, e4: false, f4: false, g4: false, h4: false,
    a3: false, b3: false, c3: false, d3: false, e3: false, f3: false, g3: false, h3: false,
    a2: false, b2: false, c2: false, d2: false, e2: false, f2: false, g2: false, h2: false,
    a1: false, b1: false, c1: false, d1: false, e1: false, f1: false, g1: false, h1: false
  };

  status = {
    a8: true, b8: true, c8: true, d8: true, e8: true, f8: true, g8: true, h8: true,
    a7: true, b7: true, c7: true, d7: true, e7: true, f7: true, g7: true, h7: true,
    a6: true, b6: true, c6: true, d6: true, e6: true, f6: true, g6: true, h6: true,
    a5: true, b5: true, c5: true, d5: true, e5: true, f5: true, g5: true, h5: true,
    a4: true, b4: true, c4: true, d4: true, e4: true, f4: true, g4: true, h4: true,
    a3: true, b3: true, c3: true, d3: true, e3: true, f3: true, g3: true, h3: true,
    a2: true, b2: true, c2: true, d2: true, e2: true, f2: true, g2: true, h2: true,
    a1: true, b1: true, c1: true, d1: true, e1: true, f1: true, g1: true, h1: true
  };

  whiteThreatPieces = [];
  blackThreatPieces = [];
  whiteForbiddenCells = [];
  blackForbiddenCells = [];
  whitePinnedPieces = [];
  blackPinnedPieces = [];
  whiteCheck = false;
  blackCheck = false;

  whiteRockList = ['c11', 'c18'];
  whiteKnightList = ['c12', 'c17'];
  whiteBishopList = ['c13', 'c16'];
  whiteQueenList = ['c14'];

  blackRockList = ['c41', 'c48'];
  blackKnightList = ['c42', 'c47'];
  blackBishopList = ['c43', 'c46'];
  blackQueenList = ['c44'];

  pieceAlive = {
    c11: {alive: true, color: 'W', currentKind: 'R', capturedBy: '', currentCell: 'a1'},
    c12: {alive: true, color: 'W', currentKind: 'N', capturedBy: '', currentCell: 'b1'},
    c13: {alive: true, color: 'W', currentKind: 'B', capturedBy: '', currentCell: 'c1'},
    c14: {alive: true, color: 'W', currentKind: 'Q', capturedBy: '', currentCell: 'd1'},
    c15: {alive: true, color: 'W', currentKind: 'K', capturedBy: '', currentCell: 'e1'},
    c16: {alive: true, color: 'W', currentKind: 'B', capturedBy: '', currentCell: 'f1'},
    c17: {alive: true, color: 'W', currentKind: 'N', capturedBy: '', currentCell: 'g1'},
    c18: {alive: true, color: 'W', currentKind: 'R', capturedBy: '', currentCell: 'h1'},
    c21: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'a2', previousKind: ''},
    c22: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'b2', previousKind: ''},
    c23: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'c2', previousKind: ''},
    c24: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'd2', previousKind: ''},
    c25: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'e2', previousKind: ''},
    c26: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'f2', previousKind: ''},
    c27: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'g2', previousKind: ''},
    c28: {alive: true, color: 'W', currentKind: 'P', capturedBy: '', currentCell: 'h2', previousKind: ''},
    c31: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'a7', previousKind: ''},
    c32: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'b7', previousKind: ''},
    c33: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'c7', previousKind: ''},
    c34: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'd7', previousKind: ''},
    c35: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'e7', previousKind: ''},
    c36: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'f7', previousKind: ''},
    c37: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'g7', previousKind: ''},
    c38: {alive: true, color: 'B', currentKind: 'P', capturedBy: '', currentCell: 'h7', previousKind: ''},
    c41: {alive: true, color: 'B', currentKind: 'R', capturedBy: '', currentCell: 'a8'},
    c42: {alive: true, color: 'B', currentKind: 'N', capturedBy: '', currentCell: 'b8'},
    c43: {alive: true, color: 'B', currentKind: 'B', capturedBy: '', currentCell: 'c8'},
    c44: {alive: true, color: 'B', currentKind: 'Q', capturedBy: '', currentCell: 'd8'},
    c45: {alive: true, color: 'B', currentKind: 'K', capturedBy: '', currentCell: 'e8'},
    c46: {alive: true, color: 'B', currentKind: 'B', capturedBy: '', currentCell: 'f8'},
    c47: {alive: true, color: 'B', currentKind: 'N', capturedBy: '', currentCell: 'g8'},
    c48: {alive: true, color: 'B', currentKind: 'R', capturedBy: '', currentCell: 'h8'}
  };

  openDialog(dataToSend: DataToPromote): void {

    console.log('inside openDialog');
    console.log(dataToSend);
    const dialogRef = this.dialog.open(PromoteDialogComponent, {
      width: '250px',
      data: { turn: dataToSend.turn, piece: dataToSend.piece, setOfPieces: dataToSend.setOfPieces }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        // If the player hits scapte Queen piece is selected
        if (dataToSend.pieceColor === 'W') {
          result = {value: String.fromCharCode(9813), kind: 'Q'};
        } else {
          result = {value: String.fromCharCode(9819), kind: 'Q'};
        }
      }

      this.promote = result;
      console.log('The dialog was closed');
      console.log(result);
      this.cells[dataToSend.currentCell][0]['cvalue'] = result.value;
      this.cells[dataToSend.currentCell][0]['kind'] = result.kind;

      this.currentMove = ELEMENT_DATA.pop();
      if (dataToSend.pieceColor === 'W') {
        if (this.cells[dataToSend.currentCell][0]['kind'] === 'R') {
          this.whiteRockList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'N') {
          this.whiteKnightList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'B') {
          this.whiteBishopList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'Q') {
          this.whiteQueenList.push(this.cells[dataToSend.currentCell][0]['cid']);
        }
        this.currentMove.white = this.currentMove.white.concat('=').concat(result.value);
        this.reviewBlackPinnedPieces();
        this.reviewWhitePinnedPieces();
        this.reviewIfWhiteCheck();
      } else {
        if (this.cells[dataToSend.currentCell][0]['kind'] === 'R') {
          this.blackRockList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'N') {
          this.blackKnightList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'B') {
          this.blackBishopList.push(this.cells[dataToSend.currentCell][0]['cid']);
        } else if (this.cells[dataToSend.currentCell][0]['kind'] === 'Q') {
          this.blackQueenList.push(this.cells[dataToSend.currentCell][0]['cid']);
        }
        this.currentMove.black = this.currentMove.black.concat('=').concat(result.value);
        this.reviewBlackPinnedPieces();
        this.reviewWhitePinnedPieces();
        this.reviewIfBlackCheck();
      }

      this.pieceAlive[this.cells[dataToSend.currentCell][0]['cid']].currentCell =
      this.cells[dataToSend.currentCell][0]['currentPosition'];
      this.pieceAlive[this.cells[dataToSend.currentCell][0]['cid']].previousKind = 'P';
      this.pieceAlive[this.cells[dataToSend.currentCell][0]['cid']].currentKind = result.kind;

      ELEMENT_DATA.push(this.currentMove);
      this.gameMoves.data.next(ELEMENT_DATA);
     });
  }

  ngOnInit() {
    // this.apiService.getGames().subscribe(res => {
    //         console.log(res)});
    // console.log('ngOnInit');
  }

  disablePiece(enable: boolean) {
    for (const item in this.cells) {
      if (this.cells[item].length !== 0) {
        if (this.cells[item][0].color === 'W') {
          this.cells[item][0].disabled = enable;
        } else {
          this.cells[item][0].disabled = !enable;
        }
      }
    }
    // console.log(this.cells)
  }

  colorOfCell(file: string, rank: string) {
    // file is a letter, rank is a number
    // file even and rank even black - columna impar fila impar negro
    // file even and rank odd  white - columna impar fila par   blanco
    // file odd  and rank even white - columna par   fila impar blanco
    // file odd  and rank odd  black - columna par   fila par   negro

    const oddFiles = ['a', 'c', 'e', 'g'];
    const found = oddFiles.find(function(element) {
      return element === file;
    });

    if (found) {
      if (((+rank) % 2) !== 0) {
          return ('B');
      } else {
          return ('W');
      }
    } else {
        if (((+rank) % 2) !== 0) {
            return ('W');
        } else {
            return ('B');
        }
    }
  }

  private cellsOfPawn(currentPiece: {}) {

    let file = '';
    let rank = '';
    let lrank = 0;
    let tempCell = '';

    let tempCellLeft = [];
    let tempCellRight = [];
    const cellsToPaint = [];

    // console.log('cells of pawn');
    // console.log('Piece to review');
    // console.log(currentPiece);

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);
    lrank = +rank;

    if (currentPiece['color'] === 'W') {
      lrank++;
      if (file !== 'a') {
        // searching at the left of the current posicion
        tempCell = this.files[this.files.indexOf(file) - 1];
        // console.log('left');
        tempCell = tempCell.concat(lrank.toString());
        // console.log(tempCell);
        tempCellLeft = this.cells[tempCell];
        // if the cell to the left of the pawn is empty add to the colored ones
        if (tempCellLeft.length === 0) {
          cellsToPaint.push(tempCell);
        }
      }
      if (file !== 'h') {
        // searching at the right of the position
        tempCell = this.files[this.files.indexOf(file) + 1];
        // console.log('right');
        tempCell = tempCell.concat(lrank.toString());
        // console.log(tempCell);
        tempCellRight = this.cells[tempCell];
        if (tempCellRight.length === 0) {
          cellsToPaint.push(tempCell);
        }
      }
    } else {
      lrank--;
      if (file !== 'a') {
        // searching at the left of the current posicion
        tempCell = this.files[this.files.indexOf(file) - 1];
        // console.log('left');
        tempCell = tempCell.concat(lrank.toString());
        // console.log(tempCell);
        tempCellLeft = this.cells[tempCell];
        if (tempCellLeft.length === 0) {
          cellsToPaint.push(tempCell);
        }
      }
      if (file !== 'h') {
        // searching at the right of the current posicion
        tempCell = this.files[this.files.indexOf(file) + 1];
        // console.log('right');
        tempCell = tempCell.concat(lrank.toString());
        // console.log(tempCell);
        tempCellRight = this.cells[tempCell];
        if (tempCellRight.length === 0) {
          cellsToPaint.push(tempCell);
        }
      }
    }

    // console.log('function Pawn cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private cellsOfRock(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];
    const cellsToPaint = [];

    // console.log('cells of rock');
    // console.log('Piece to review');
    // console.log(currentPiece);

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    // left
    // console.log('left');
    lrank = +rank;
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right
    // console.log('right');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // down
    // console.log('down');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // up
    // console.log('up');
    // console.log(currentPiece['color']);
    follow = true;
    i = 1;
    while (follow) {
      if (lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // console.log('function Rock cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private cellsOfKnight(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let tempCell = '';

    let tempCellLeftUp1 = [];
    let tempCellLeftUp2 = [];
    let tempCellRightUp1 = [];
    let tempCellRightUp2 = [];
    let tempCellRightDown1 = [];
    let tempCellRightDown2 = [];
    let tempCellLeftDown1 = [];
    let tempCellLeftDown2 = [];

    const cellsToPaint = [];
    // console.log('cells of knight');

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    lrank = +rank;

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellLeftUp1 = this.cells[tempCell];
        if (tempCellLeftUp1.length !== 0) {
          if (tempCellLeftUp1[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellLeftUp2 = this.cells[tempCell];
        if (tempCellLeftUp2.length !== 0) {
          if (tempCellLeftUp2[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellRightUp1 = this.cells[tempCell];
        if (tempCellRightUp1.length !== 0) {
          if (tempCellRightUp1[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellRightUp2 = this.cells[tempCell];
        if (tempCellRightUp2.length !== 0) {
          if (tempCellRightUp2[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellRightDown1 = this.cells[tempCell];
        if (tempCellRightDown1.length !== 0) {
          if (tempCellRightDown1[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellRightDown2 = this.cells[tempCell];
        if (tempCellRightDown2.length !== 0) {
          if (tempCellRightDown2[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellLeftDown1 = this.cells[tempCell];
        if (tempCellLeftDown1.length !== 0) {
          if (tempCellLeftDown1[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellLeftDown2 = this.cells[tempCell];
        if (tempCellLeftDown2.length !== 0) {
          if (tempCellLeftDown2[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
          }
        } else {
          cellsToPaint.push(tempCell);
        }
    }

    // console.log('function Knight cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private cellsOfBishop(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];

    const cellsToPaint = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    // console.log('bishop');

    // left and up
    // console.log('left and up');
    lrank = +rank;
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and up
    // console.log('right and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and down
    // console.log('left and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and down
    // console.log('right and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }

    // console.log('function Bishop cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private cellsOfQueen(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];

    const cellsToPaint = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    // console.log('queen');

    // left
    // console.log('left');
    lrank = +rank;
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right
    // console.log('right');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // down
    // console.log('down');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // up
    // console.log('up');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and up
    // console.log('left and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and up
    // console.log('right and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank + i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and down
    // console.log('left and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and down
    // console.log('right and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank - i).toString());
        // console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if (tempCellDiagonal[0].color !== currentPiece['color']) {
            cellsToPaint.push(tempCell);
            if (tempCellDiagonal[0].kind !== 'K') {
              follow = false;
            }
          } else {
            follow = false;
          }
        } else {
          cellsToPaint.push(tempCell);
        }
      } else {
        follow = false;
      }
      i++;
    }
    // console.log('function Queen cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private cellsOfKing(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let tempCell = '';

    let tempCellDiagonal = [];

    const cellsToPaint = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    // console.log('King');

    // left
    // console.log('left');
    lrank = +rank;
    if (this.files[this.files.indexOf(file) - 1] !== undefined) {

      tempCell = this.files[this.files.indexOf(file) - 1];
      tempCell = tempCell.concat((lrank).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // right
    // console.log('right');
    if (this.files[this.files.indexOf(file) + 1] !== undefined) {
      tempCell = this.files[this.files.indexOf(file) + 1];
      tempCell = tempCell.concat((lrank).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // down
    // console.log('down');
    if (lrank - 1 > this.minLimit) {
      tempCell = this.files[this.files.indexOf(file)];
      tempCell = tempCell.concat((lrank - 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // up
    // console.log('up');
    if (lrank + 1 < this.maxLimit) {
      tempCell = this.files[this.files.indexOf(file)];
      tempCell = tempCell.concat((lrank + 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // left and up
    // console.log('left and up');
    if (this.files[this.files.indexOf(file) - 1] !== undefined
        && lrank + 1 < this.maxLimit) {
      tempCell = this.files[this.files.indexOf(file) - 1];
      tempCell = tempCell.concat((lrank + 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // right and up
    // console.log('right and up');
    if (this.files[this.files.indexOf(file) + 1] !== undefined
        && lrank + 1 < this.maxLimit) {
      tempCell = this.files[this.files.indexOf(file) + 1];
      tempCell = tempCell.concat((lrank + 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // left and down
    // console.log('left and down');
    if (this.files[this.files.indexOf(file) - 1] !== undefined
        && lrank - 1 > this.minLimit) {

      tempCell = this.files[this.files.indexOf(file) - 1];
      tempCell = tempCell.concat((lrank - 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // right and down
    // console.log('right and down');
    if (this.files[this.files.indexOf(file) + 1] !== undefined
        && lrank - 1 > this.minLimit) {

      tempCell = this.files[this.files.indexOf(file) + 1];
      tempCell = tempCell.concat((lrank - 1).toString());
      // console.log(tempCell);

      tempCellDiagonal = this.cells[tempCell];
      if (tempCellDiagonal.length !== 0) {
        if (tempCellDiagonal[0].color !== currentPiece['color']) {
          cellsToPaint.push(tempCell);
        }
      } else {
        cellsToPaint.push(tempCell);
      }
    }
    // console.log('function King cells to paint');
    // console.log(cellsToPaint);
    return cellsToPaint;
  }

  private check(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];
    let tempCellLeftUp1 = [];
    let tempCellLeftUp2 = [];
    let tempCellRightUp1 = [];
    let tempCellRightUp2 = [];
    let tempCellRightDown1 = [];
    let tempCellRightDown2 = [];
    let tempCellLeftDown1 = [];
    let tempCellLeftDown2 = [];

    const cellsToPaint = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    console.log('check');
    console.log('current piece');
    console.log(currentPiece);

    // left
    console.log('left');
    lrank = +rank;
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right
    console.log('right');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // down
    console.log('down');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // up
    console.log('up');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and up
    console.log('left and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        } 
      } else {
        follow = false;
      }
      i++;
    }
    // right and up
    console.log('right and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and down
    console.log('left and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and down
    console.log('right and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }

    // possible positions of knights

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellLeftUp1 = this.cells[tempCell];
        if (tempCellLeftUp1.length !== 0) {
          if ((tempCellLeftUp1[0].color !== currentPiece['color']) &&
             (tempCellLeftUp1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellLeftUp2 = this.cells[tempCell];
        if (tempCellLeftUp2.length !== 0) {
          if ((tempCellLeftUp2[0].color !== currentPiece['color']) &&
             (tempCellLeftUp2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellRightUp1 = this.cells[tempCell];
        if (tempCellRightUp1.length !== 0) {
          if ((tempCellRightUp1[0].color !== currentPiece['color']) &&
             (tempCellRightUp1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellRightUp2 = this.cells[tempCell];
        if (tempCellRightUp2.length !== 0) {
          if ((tempCellRightUp2[0].color !== currentPiece['color']) &&
             (tempCellRightUp2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellRightDown1 = this.cells[tempCell];
        if (tempCellRightDown1.length !== 0) {
          if ((tempCellRightDown1[0].color !== currentPiece['color']) &&
             (tempCellRightDown1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellRightDown2 = this.cells[tempCell];
        if (tempCellRightDown2.length !== 0) {
          if ((tempCellRightDown2[0].color !== currentPiece['color']) &&
             (tempCellRightDown2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellLeftDown1 = this.cells[tempCell];
        if (tempCellLeftDown1.length !== 0) {
          if ((tempCellLeftDown1[0].color !== currentPiece['color']) &&
             (tempCellLeftDown1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellLeftDown2 = this.cells[tempCell];
        if (tempCellLeftDown2.length !== 0) {
          if ((tempCellLeftDown2[0].color !== currentPiece['color']) &&
             (tempCellLeftDown2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    console.log('function Check cells to paint');
    console.log(cellsToPaint);
    return cellsToPaint;
  }

  private isProtected(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];
    let tempCellLeftUp1 = [];
    let tempCellLeftUp2 = [];
    let tempCellRightUp1 = [];
    let tempCellRightUp2 = [];
    let tempCellRightDown1 = [];
    let tempCellRightDown2 = [];
    let tempCellLeftDown1 = [];
    let tempCellLeftDown2 = [];

    const cellsToPaint = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    console.log('isProtected');
    console.log('current piece');
    console.log(currentPiece);

    // left
    console.log('left');
    lrank = +rank;
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right
    console.log('right');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // down
    console.log('down');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // up
    console.log('up');
    follow = true;
    i = 1;
    while (follow) {
      if (lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and up
    console.log('left and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1) ||
             (tempCellDiagonal[0].kind === 'P' && i === 1) )) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        } 
      } else {
        follow = false;
      }
      i++;
    }
    // right and up
    console.log('right and up');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1) ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and down
    console.log('left and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1) ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and down
    console.log('right and down');
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color === currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q' ||
             (tempCellDiagonal[0].kind === 'K' && i === 1) ||
             (tempCellDiagonal[0].kind === 'P' && i === 1))) {
              cellsToPaint.push(tempCell);
          }
          follow = false;
        }
      } else {
        follow = false;
      }
      i++;
    }

    // possible positions of knights

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellLeftUp1 = this.cells[tempCell];
        if (tempCellLeftUp1.length !== 0) {
          if ((tempCellLeftUp1[0].color === currentPiece['color']) &&
             (tempCellLeftUp1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellLeftUp2 = this.cells[tempCell];
        if (tempCellLeftUp2.length !== 0) {
          if ((tempCellLeftUp2[0].color === currentPiece['color']) &&
             (tempCellLeftUp2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank + 2 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank + 2).toString());
        tempCellRightUp1 = this.cells[tempCell];
        if (tempCellRightUp1.length !== 0) {
          if ((tempCellRightUp1[0].color === currentPiece['color']) &&
             (tempCellRightUp1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank + 1 < this.maxLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank + 1).toString());
        tempCellRightUp2 = this.cells[tempCell];
        if (tempCellRightUp2.length !== 0) {
          if ((tempCellRightUp2[0].color === currentPiece['color']) &&
             (tempCellRightUp2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellRightDown1 = this.cells[tempCell];
        if (tempCellRightDown1.length !== 0) {
          if ((tempCellRightDown1[0].color === currentPiece['color']) &&
             (tempCellRightDown1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) + 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) + 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellRightDown2 = this.cells[tempCell];
        if (tempCellRightDown2.length !== 0) {
          if ((tempCellRightDown2[0].color === currentPiece['color']) &&
             (tempCellRightDown2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 1] !== undefined) &&
      (lrank - 2 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 1];
        tempCell = tempCell.concat((lrank - 2).toString());
        tempCellLeftDown1 = this.cells[tempCell];
        if (tempCellLeftDown1.length !== 0) {
          if ((tempCellLeftDown1[0].color === currentPiece['color']) &&
             (tempCellLeftDown1[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    if ((this.files[this.files.indexOf(file) - 2] !== undefined) &&
      (lrank - 1 > this.minLimit)) {
        tempCell = this.files[this.files.indexOf(file) - 2];
        tempCell = tempCell.concat((lrank - 1).toString());
        tempCellLeftDown2 = this.cells[tempCell];
        if (tempCellLeftDown2.length !== 0) {
          if ((tempCellLeftDown2[0].color === currentPiece['color']) &&
             (tempCellLeftDown2[0].kind === 'N')) {
              cellsToPaint.push(tempCell);
          }
        }
    }

    console.log('function isProtected cells to paint');
    console.log(cellsToPaint);
    return cellsToPaint;
  }

  private checkPinnedPieces(currentPiece: {}) {
    let file = '';
    let rank = '';
    let lrank = 0;
    let i = 0;
    let follow = true;
    let tempCell = '';

    let tempCellDiagonal = [];
    let temporalPiece = '';

    const pinnedPieces = [];

    file = currentPiece['currentPosition'].substring(0, 1);
    rank = currentPiece['currentPosition'].substring(1, 2);

    console.log('checkPinnedPieces');
    console.log('current piece');
    console.log(currentPiece);

    // left
    console.log('left');
    lrank = +rank;
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right
    console.log('right');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined) {
        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // down
    console.log('down');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // up
    console.log('up');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file)];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'R' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and up
    console.log('left and up');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and up
    console.log('right and up');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank + i < this.maxLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank + i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // left and down
    console.log('left and down');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) - i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) - i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }
    // right and down
    console.log('right and down');
    temporalPiece = '';
    follow = true;
    i = 1;
    while (follow) {
      if (this.files[this.files.indexOf(file) + i] !== undefined
          && lrank - i > this.minLimit) {

        tempCell = this.files[this.files.indexOf(file) + i];
        tempCell = tempCell.concat((lrank - i).toString());
        console.log(tempCell);

        tempCellDiagonal = this.cells[tempCell];
        if (tempCellDiagonal.length !== 0) {
          if ((tempCellDiagonal[0].color !== currentPiece['color']) &&
             (tempCellDiagonal[0].kind === 'B' || tempCellDiagonal[0].kind === 'Q')) {
              pinnedPieces.push(temporalPiece);
              follow = false;
          } else {
            if (temporalPiece !== '') {
              follow = false;
            } else {
              temporalPiece = tempCell;
            }
          }
        }
      } else {
        follow = false;
      }
      i++;
    }

    console.log('function checkPinnedPieces pieces');
    console.log(pinnedPieces);
    return pinnedPieces;
  }

  private correctMoveNotation(file: string, rank: string, targetCell: string, currentPiece: {}) {
    let currentMove = '';
    let piecePosition = '';
    let listOfPieces = [];
    let numberOfOcurrences = 0;
    const possiblePieces = [];

    currentMove = file.concat(rank);
    console.log('Correct Move Notation');
    if (currentPiece['kind'] === 'R') {
      // according to color the list of Rocks is sets
      if (currentPiece['color'] === 'W') {
        listOfPieces = this.whiteRockList;
      } else {
        listOfPieces = this.blackRockList;
      }
    } else if (currentPiece['kind'] === 'N') {
      if (currentPiece['color'] === 'W') {
        listOfPieces = this.whiteKnightList;
      } else {
        listOfPieces = this.blackKnightList;
      }
    } else if (currentPiece['kind'] === 'B') {
      if (currentPiece['color'] === 'W') {
        listOfPieces = this.whiteBishopList;
      } else {
        listOfPieces = this.blackBishopList;
      }
    } else if (currentPiece['kind'] === 'Q') {
      if (currentPiece['color'] === 'W') {
        listOfPieces = this.whiteQueenList;
      } else {
        listOfPieces = this.blackQueenList;
      }
    }

    console.log('List');
    console.log(listOfPieces);

    let cellsAllowed = [];
    // for every piece in the list the available cells are listed
    for (const piece of listOfPieces) {
      piecePosition = this.pieceAlive[piece].currentCell;
      console.log('Pieces');
      console.log(piece);

      if (currentPiece['kind'] === 'R') {
        cellsAllowed = this.cellsOfRock(this.cells[piecePosition][0]);
      } else if (currentPiece['kind'] === 'N') {
        cellsAllowed = this.cellsOfKnight(this.cells[piecePosition][0]);
      } else if (currentPiece['kind'] === 'B') {
        cellsAllowed = this.cellsOfBishop(this.cells[piecePosition][0]);
      } else if (currentPiece['kind'] === 'Q') {
        cellsAllowed = this.cellsOfQueen(this.cells[piecePosition][0]);
      }

      // CurrentMove is searched in the available positions
      const found = cellsAllowed.find(function(element) {
        return element === targetCell;
      });
      if (found) {
        possiblePieces.push(piece);
        numberOfOcurrences++;
      }
    }

    console.log('Possible Pieces');
    console.log(possiblePieces);

    if (possiblePieces.length === 1) {
      // Single Notation
      return this.currentPiece['kind'];
    } else if (possiblePieces.length === 2) {
      // File or Rank Notation
      let filea = '';
      let fileb = '';
      let ranka = '';
      let rankb = '';
      let notation = '';

      filea = this.pieceAlive[possiblePieces[0]]['currentCell'];
      ranka = this.pieceAlive[possiblePieces[0]]['currentCell'];
      filea = filea.substring(0, 1);
      ranka = ranka.substring(1, 2);

      fileb = this.pieceAlive[possiblePieces[1]]['currentCell'];
      rankb = this.pieceAlive[possiblePieces[1]]['currentCell'];
      fileb = fileb.substring(0, 1);
      rankb = rankb.substring(1, 2);

      if (ranka === rankb) {
        notation = currentPiece['currentPosition'].substring(0, 1);
      } else if (filea === fileb) {
        notation = currentPiece['currentPosition'].substring(1, 2);
      } else {
        notation = currentPiece['currentPosition'].substring(0, 1);
      }
      return this.currentPiece['kind'].concat(notation);
    } else if (possiblePieces.length > 2) {
      // Full Notation
      return this.currentPiece['kind'].concat(file).concat(rank);
    }
  }

  public allowdrop(item: CdkDrag, listItem: CdkDropList) {
    // console.log('alowdrop')

    const found = item.data['cellsToPaint'].find(function(element) {
      return element === listItem.element.nativeElement.getAttribute('name');
    });

    if (found !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  public ended(event: CdkDragEnd) {
    console.log('ended method');
    let threatedCells = [];

    this.currentName = event.source.element.nativeElement.getAttribute('name');
    this.currentPiece = this.cells[this.previousName][0];

    if (!this.whiteTurn) {
      threatedCells = this.whiteThreatPieces;
    } else {
      threatedCells = this.blackThreatPieces;
    }

    console.log('Threat Cells');
    console.log(threatedCells);

    if (this.currentPiece['kind'] === 'K') {

      const forbiddenCells = [];

      let tempCells = [];
      for (const item of threatedCells) {
        if (this.cells[item][0].kind === 'R') {
          tempCells = this.cellsOfRock(this.cells[item][0]);
        } else if (this.cells[item][0].kind === 'B') {
          tempCells = this.cellsOfBishop(this.cells[item][0]);
        } else if (this.cells[item][0].kind === 'N') {
          tempCells = this.cellsOfKnight(this.cells[item][0]);
        } else if (this.cells[item][0].kind === 'Q') {
          tempCells = this.cellsOfQueen(this.cells[item][0]);
        }
        for (const sItem of tempCells) {
          forbiddenCells.push(sItem);
        }
      }

      for (const item of this.currentPiece['cellsToPaint']) {
        // check if the cell is not under attack
        const found = forbiddenCells.find(element => element === item);

        if (found === undefined) {
          // If the cell is not under attack King can move to this cell
          this.status[item] = true;
        }
      }
    } else {
      for (const item of this.currentPiece['cellsToPaint']) {
        this.status[item] = true;
      }
    }
    this.currentCellsToPaint = [];
  }

  public started(event: CdkDragStart) {

    console.log('started method');
    console.log(event);
    console.log('same piece clicked');
    console.log(this.samePieceClicked);
    console.log(this.clickedName);

    if (event instanceof MouseEvent) {
      if (this.clickedName !== event['path'][3].attributes[3].value) {
        this.samePieceClicked = false;
      } else {
        this.samePieceClicked = !this.samePieceClicked;
      }
      this.clickedName = event['path'][3].attributes[3].value;
      this.previousName = event['path'][3].attributes[3].value;
    } else {
      this.samePieceClicked = false;
      this.previousName = event.source.element.nativeElement.parentElement.getAttribute('name');
    }
    console.log(this.previousName);

    // Unpaint previous cells to paint
    for (const item of this.currentCellsToPaint ) {
      this.status[item] = true;
    }

    this.currentPiece = this.cells[this.previousName][0];
    console.log(this.currentPiece['kind']);
    console.log(this.currentPiece['color']);
    console.log(this.whiteTurn);

    const currentColor = this.currentPiece['color'];

    if (currentColor === 'W' && !this.whiteTurn && this.whitePinnedPieces.indexOf(this.previousName) === -1
     || currentColor === 'B' && this.whiteTurn  && this.blackPinnedPieces.indexOf(this.previousName) === -1) {

      console.log ('color: ' + currentColor );
      console.log ('whiteTurn: ' + this.whiteTurn);

      this.file = this.currentPiece['currentPosition'];
      this.rank = this.currentPiece['currentPosition'];
      this.file = this.file.substring(0, 1);
      this.rank = this.rank.substring(1, 2);

      let lrank = 0;
      let i = 0;
      let follow = true;
      let temp: Turn = new Turn();
      let tempCell = '';

      let tempCellDiagonal = [];

      let tempCellLeft = [];
      let tempCellCenter = [];
      let tempCellRight = [];

      let tempCellLeftUp1 = [];
      let tempCellLeftUp2 = [];
      let tempCellRightUp1 = [];
      let tempCellRightUp2 = [];
      let tempCellRightDown1 = [];
      let tempCellRightDown2 = [];
      let tempCellLeftDown1 = [];
      let tempCellLeftDown2 = [];

      this.currentPiece['cellsToPaint'] = [];

      if (this.currentPiece['kind'] === 'P') {
        lrank = +this.rank;

        if (this.currentPiece['color'] === 'W') {
          lrank++;

          tempCell = this.file.concat(lrank.toString());
          tempCellCenter = this.cells[tempCell];
          // if the cell in from of the pawn is empty, add to the colored ones
          if (tempCellCenter.length === 0) {
            this.currentPiece['cellsToPaint'].push(this.file.concat(lrank.toString()));
          }

          if (this.file !== 'a') {
            // searching at the left of the current posicion
            tempCell = this.files[this.files.indexOf(this.file) - 1];
            tempCell = tempCell.concat(lrank.toString());
            tempCellLeft = this.cells[tempCell];
            // if the cell to the left of the pawn is not empty and is and opponet, add to the colored ones
            if (tempCellLeft.length !== 0) {
              if (tempCellLeft[0].color === 'B') {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
            // if the pawn is on the fifth rank it can capture en passant only if the opponent is at the left
            if (+this.rank === this.whiteEnPassantRank) {
              tempCell = this.files[this.files.indexOf(this.file) - 1];
              tempCell = tempCell.concat((lrank - 1).toString());
              tempCellLeft = this.cells[tempCell];
              if (tempCellLeft.length !== 0) {
                // En passant can be done only if the move of the opponent is the first move 
                if (tempCellLeft[0].color === 'B' && tempCellLeft[0].counterOfMoves === 1) {
                  temp = new Turn();
                  temp = this.blackMoves[this.blackMoves.length - 1];
                  console.log(temp);
                  // Just to confirm the current position of the opponent
                  if (temp.piece['kind'] === 'P' && tempCell === temp.piece['currentPosition']) {
                    tempCell = this.files[this.files.indexOf(this.file) - 1];
                    tempCell = tempCell.concat((lrank).toString());
                    this.whiteEnPassantMove = tempCell;
                    this.whiteEnPassantOpponentPosition = temp.piece['currentPosition'];
                    this.currentPiece['cellsToPaint'].push(tempCell);
                  }
                }
              }
            }
          }

          if (this.file !== 'h') {
            // searching at the right of the position
            tempCell = this.files[this.files.indexOf(this.file) + 1];
            console.log('derecha');
            tempCell = tempCell.concat(lrank.toString());
            console.log(tempCell);
            tempCellRight = this.cells[tempCell];
            if (tempCellRight.length !== 0) {
              if (tempCellRight[0].color === 'B') {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
            if (+this.rank === this.whiteEnPassantRank) {
              tempCell = this.files[this.files.indexOf(this.file) + 1];
              tempCell = tempCell.concat((lrank - 1).toString());
              tempCellRight = this.cells[tempCell];
              if (tempCellRight.length !== 0) {
                if (tempCellRight[0].color === 'B' && tempCellRight[0].counterOfMoves === 1) {
                  temp = new Turn();
                  temp = this.blackMoves[this.blackMoves.length - 1];
                  console.log(temp);
                  if (temp.piece['kind'] === 'P' && tempCell === temp.piece['currentPosition']) {
                    tempCell = this.files[this.files.indexOf(this.file) + 1];
                    tempCell = tempCell.concat((lrank).toString());
                    this.whiteEnPassantMove = tempCell;
                    this.whiteEnPassantOpponentPosition = temp.piece['currentPosition'];
                    this.currentPiece['cellsToPaint'].push(tempCell);
                  }
                }
              }
            }
          }
        } else {
          lrank--;
          tempCell = this.file.concat(lrank.toString());
          tempCellCenter = this.cells[tempCell];
          if (tempCellCenter.length === 0) {
            this.currentPiece['cellsToPaint'].push(this.file.concat(lrank.toString()));
          }

          if (this.file !== 'a') {
            // searching at the left of the current posicion
            tempCell = this.files[this.files.indexOf(this.file) - 1];
            tempCell = tempCell.concat(lrank.toString());
            tempCellLeft = this.cells[tempCell];
            if (tempCellLeft.length !== 0) {
              if (tempCellLeft[0].color === 'W') {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
            if (+this.rank === this.blackEnPassantRank) {
              tempCell = this.files[this.files.indexOf(this.file) - 1];
              tempCell = tempCell.concat((lrank + 1).toString());
              tempCellLeft = this.cells[tempCell];
              if (tempCellLeft.length !== 0) {
                if (tempCellLeft[0].color === 'W' && tempCellLeft[0].counterOfMoves === 1) {
                  temp = new Turn();
                  temp = this.whiteMoves[this.whiteMoves.length - 1];
                  console.log(temp);
                  if (temp.piece['kind'] === 'P' && tempCell === temp.piece['currentPosition']) {
                    tempCell = this.files[this.files.indexOf(this.file) - 1];
                    tempCell = tempCell.concat((lrank).toString());
                    this.blackEnPassantMove = tempCell;
                    this.blackEnPassantOpponentPosition = temp.piece['currentPosition'];
                    this.currentPiece['cellsToPaint'].push(tempCell);
                  }
                }
              }
            }
          }

          if (this.file !== 'h') {
            // searching at the right of the current posicion
            tempCell = this.files[this.files.indexOf(this.file) + 1];
            tempCell = tempCell.concat(lrank.toString());
            tempCellRight = this.cells[tempCell];
            if (tempCellRight.length !== 0) {
              if (tempCellRight[0].color === 'W') {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
            if (+this.rank === this.blackEnPassantRank) {
              tempCell = this.files[this.files.indexOf(this.file) + 1];
              tempCell = tempCell.concat((lrank + 1).toString());
              tempCellRight = this.cells[tempCell];
              if (tempCellRight.length !== 0) {
                if (tempCellRight[0].color === 'W' && tempCellRight[0].counterOfMoves === 1) {
                  temp = new Turn();
                  temp = this.whiteMoves[this.whiteMoves.length - 1];
                  console.log(temp);
                  if (temp.piece['kind'] === 'P' && tempCell === temp.piece['currentPosition']) {
                    tempCell = this.files[this.files.indexOf(this.file) + 1];
                    tempCell = tempCell.concat((lrank).toString());
                    this.blackEnPassantMove = tempCell;
                    this.blackEnPassantOpponentPosition = temp.piece['currentPosition'];
                    this.currentPiece['cellsToPaint'].push(tempCell);
                  }
                }
              }
            }
          }
        }

        console.log ('countefOfMoves: ' + this.currentPiece['counterOfMoves']);

        if (this.currentPiece['counterOfMoves'] === 0) {
          if (this.currentPiece['color'] === 'W') {
            lrank++;
          } else {
            lrank--;
          }

          tempCell = this.file.concat(lrank.toString());
          tempCellCenter = this.cells[tempCell];
          console.log(tempCell);
          if (tempCellCenter.length === 0) {
            this.currentPiece['cellsToPaint'].push(this.file.concat(lrank.toString()));
          }
        }
      } else if (this.currentPiece['kind'] === 'R') {
        console.log('rock');

        // left
        console.log('left');
        lrank = +this.rank;
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined) {

            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right
        console.log('right');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined) {

            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // down
        console.log('down');
        follow = true;
        i = 1;
        while (follow) {
          if (lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file)];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // up
        console.log('up');
        follow = true;
        i = 1;
        while (follow) {
          if (lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file)];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
      } else if (this.currentPiece['kind'] === 'N') {
        lrank = +this.rank;

        if ((this.files[this.files.indexOf(this.file) - 2] !== undefined) &&
          (lrank + 1 < this.maxLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) - 2];
            tempCell = tempCell.concat((lrank + 1).toString());
            tempCellLeftUp1 = this.cells[tempCell];
            if (tempCellLeftUp1.length !== 0) {
              if (tempCellLeftUp1[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) - 1] !== undefined) &&
          (lrank + 2 < this.maxLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) - 1];
            tempCell = tempCell.concat((lrank + 2).toString());
            tempCellLeftUp2 = this.cells[tempCell];
            if (tempCellLeftUp2.length !== 0) {
              if (tempCellLeftUp2[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) + 1] !== undefined) &&
          (lrank + 2 < this.maxLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) + 1];
            tempCell = tempCell.concat((lrank + 2).toString());
            tempCellRightUp1 = this.cells[tempCell];
            if (tempCellRightUp1.length !== 0) {
              if (tempCellRightUp1[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) + 2] !== undefined) &&
          (lrank + 1 < this.maxLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) + 2];
            tempCell = tempCell.concat((lrank + 1).toString());
            tempCellRightUp2 = this.cells[tempCell];
            if (tempCellRightUp2.length !== 0) {
              if (tempCellRightUp2[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) + 2] !== undefined) &&
          (lrank - 1 > this.minLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) + 2];
            tempCell = tempCell.concat((lrank - 1).toString());
            tempCellRightDown1 = this.cells[tempCell];
            if (tempCellRightDown1.length !== 0) {
              if (tempCellRightDown1[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) + 1] !== undefined) &&
          (lrank - 2 > this.minLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) + 1];
            tempCell = tempCell.concat((lrank - 2).toString());
            tempCellRightDown2 = this.cells[tempCell];
            if (tempCellRightDown2.length !== 0) {
              if (tempCellRightDown2[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) - 1] !== undefined) &&
          (lrank - 2 > this.minLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) - 1];
            tempCell = tempCell.concat((lrank - 2).toString());
            tempCellLeftDown1 = this.cells[tempCell];
            if (tempCellLeftDown1.length !== 0) {
              if (tempCellLeftDown1[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }

        if ((this.files[this.files.indexOf(this.file) - 2] !== undefined) &&
          (lrank - 1 > this.minLimit)) {
            tempCell = this.files[this.files.indexOf(this.file) - 2];
            tempCell = tempCell.concat((lrank - 1).toString());
            tempCellLeftDown2 = this.cells[tempCell];
            if (tempCellLeftDown2.length !== 0) {
              if (tempCellLeftDown2[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
        }
      } else if (this.currentPiece['kind'] === 'B') {
        console.log('bishop');

        // left and up
        console.log('left and up');
        lrank = +this.rank;
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined
              && lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right and up
        console.log('right and up');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined
              && lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // left and down
        console.log('left and down');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined
              && lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right and down
        console.log('right and down');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined
              && lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
      } else if (this.currentPiece['kind'] === 'Q') {
        console.log('queen');

        // left
        console.log('left');
        lrank = +this.rank;
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined) {
            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right
        console.log('right');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined) {
            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // down
        console.log('down');
        follow = true;
        i = 1;
        while (follow) {
          if (lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file)];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // up
        console.log('up');
        follow = true;
        i = 1;
        while (follow) {
          if (lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file)];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // left and up
        console.log('left and up');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined
              && lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right and up
        console.log('right and up');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined
              && lrank + i < this.maxLimit) {

            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank + i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // left and down
        console.log('left and down');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) - i] !== undefined
              && lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file) - i];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
        // right and down
        console.log('right and down');
        follow = true;
        i = 1;
        while (follow) {
          if (this.files[this.files.indexOf(this.file) + i] !== undefined
              && lrank - i > this.minLimit) {

            tempCell = this.files[this.files.indexOf(this.file) + i];
            tempCell = tempCell.concat((lrank - i).toString());
            console.log(tempCell);

            tempCellDiagonal = this.cells[tempCell];
            if (tempCellDiagonal.length !== 0) {
              if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
              follow = false;
            } else {
              this.currentPiece['cellsToPaint'].push(tempCell);
            }
          } else {
            follow = false;
          }
          i++;
        }
      } else if (this.currentPiece['kind'] === 'K') {
        console.log('King');

        let protectedCells = [];
        console.log('Protected Cells');
        console.log(protectedCells);

        // left
        console.log('left');
        lrank = +this.rank;
        if (this.files[this.files.indexOf(this.file) - 1] !== undefined) {

          tempCell = this.files[this.files.indexOf(this.file) - 1];
          tempCell = tempCell.concat((lrank).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // right
        console.log('right');
        if (this.files[this.files.indexOf(this.file) + 1] !== undefined) {
          tempCell = this.files[this.files.indexOf(this.file) + 1];
          tempCell = tempCell.concat((lrank).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // down
        console.log('down');
        if (lrank - 1 > this.minLimit) {
          tempCell = this.files[this.files.indexOf(this.file)];
          tempCell = tempCell.concat((lrank - 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // up
        console.log('up');
        if (lrank + 1 < this.maxLimit) {
          tempCell = this.files[this.files.indexOf(this.file)];
          tempCell = tempCell.concat((lrank + 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // left and up
        console.log('left and up');
        if (this.files[this.files.indexOf(this.file) - 1] !== undefined
            && lrank + 1 < this.maxLimit) {
          tempCell = this.files[this.files.indexOf(this.file) - 1];
          tempCell = tempCell.concat((lrank + 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // right and up
        console.log('right and up');
        if (this.files[this.files.indexOf(this.file) + 1] !== undefined
            && lrank + 1 < this.maxLimit) {
          tempCell = this.files[this.files.indexOf(this.file) + 1];
          tempCell = tempCell.concat((lrank + 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // left and down
        console.log('left and down');
        if (this.files[this.files.indexOf(this.file) - 1] !== undefined
            && lrank - 1 > this.minLimit) {

          tempCell = this.files[this.files.indexOf(this.file) - 1];
          tempCell = tempCell.concat((lrank - 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }
        // right and down
        console.log('right and down');
        if (this.files[this.files.indexOf(this.file) + 1] !== undefined
            && lrank - 1 > this.minLimit) {

          tempCell = this.files[this.files.indexOf(this.file) + 1];
          tempCell = tempCell.concat((lrank - 1).toString());
          console.log(tempCell);

          tempCellDiagonal = this.cells[tempCell];
          if (tempCellDiagonal.length !== 0) {
            if (tempCellDiagonal[0].color !== this.currentPiece['color']) {
              protectedCells = this.isProtected(tempCellDiagonal[0]);
              if (protectedCells.length === 0) {
                this.currentPiece['cellsToPaint'].push(tempCell);
              }
            }
          } else {
            this.currentPiece['cellsToPaint'].push(tempCell);
          }
        }

        // Conditions for Castling
        // King moves equals cero
        // Rock moves equals cero
        // Cells between King and Rock must be empty
        if (this.currentPiece['color'] === 'W') {
          // Castling for white King only if the King has no moves
          if (this.currentPiece['counterOfMoves'] === 0) {
            // Short Castling
            if (this.cells['f1'].length === 0 && this.cells['g1'].length === 0 && this.cells['h1'].length !== 0) {
              if (this.cells['h1'][0].counterOfMoves === 0) {
                if (this.whiteForbiddenCells.indexOf('f1') !== -1 && this.whiteForbiddenCells.indexOf('g1') !== -1) {
                  // Cells between King and Rock are not under attack
                  // When Castling ends, King is not in check
                  console.log('white short castling');
                  this.whiteShortCastlingMove = 'g1';
                  this.currentPiece['cellsToPaint'].push(this.whiteShortCastlingMove);
                }
              }
            }
            // Long Castling
            if (this.cells['b1'].length === 0 && this.cells['c1'].length === 0 && this.cells['d1'].length === 0
              && this.cells['a1'].length !== 0) {
              if (this.cells['a1'][0].counterOfMoves === 0) {
                if (this.whiteForbiddenCells.indexOf('c1') !== -1 && this.whiteForbiddenCells.indexOf('d1') !== -1) {
                  // Cells between King and Rock are not under attack
                  // When Castling ends, King is not in check
                  console.log('white long castling');
                  this.whiteLongCastlingMove = 'c1';
                  this.currentPiece['cellsToPaint'].push(this.whiteLongCastlingMove);
                }
              }
            }
          }
        } else {
          // Castling for black King only if the King has no moves
          if (this.currentPiece['counterOfMoves'] === 0) {
            // Short Castling
            if (this.cells['f8'].length === 0 && this.cells['g8'].length === 0 && this.cells['h8'].length !== 0) {
              if (this.cells['h8'][0].counterOfMoves === 0) {
                if (this.blackForbiddenCells.indexOf('f8') !== -1 && this.blackForbiddenCells.indexOf('g8') !== -1) {
                  // Cells between King and Rock are not under attack
                  // When Castling ends, King is not in check
                  console.log('black short castling');
                  this.blackShortCastlingMove = 'g8';
                  this.currentPiece['cellsToPaint'].push(this.blackShortCastlingMove);
                }
              }
            }
            // Long Castling
            if (this.cells['b8'].length === 0 && this.cells['c8'].length === 0 && this.cells['d8'].length === 0
               && this.cells['a8'].length !== 0) {
              if (this.cells['a8'][0].counterOfMoves === 0) {
                if (this.blackForbiddenCells.indexOf('c8') !== -1 && this.blackForbiddenCells.indexOf('d8') !== -1) {
                  // Cells between King and Rock are not under attack
                  // When Castling ends, King is not in check
                  console.log('black long castling');
                  this.blackLongCastlingMove = 'c8';
                  this.currentPiece['cellsToPaint'].push(this.blackLongCastlingMove);
                }
              }
            }
          }
        }
      }
      console.log('cells to paint');
      console.log(this.currentPiece['cellsToPaint']);

      // Must add the threated cells for King and then evaluate the forbidden ones
      let threatedCells = [];
      if (!this.whiteTurn) {
        threatedCells = this.whiteThreatPieces;
      } else {
        threatedCells = this.blackThreatPieces;
      }
      console.log('Threat Cells');
      console.log(threatedCells);

      if (this.currentPiece['kind'] === 'K') {
        let forbiddenCells = [];

        let tempCells = [];
        for (const item of threatedCells) {
          if (this.cells[item][0].kind === 'R') {
            tempCells = this.cellsOfRock(this.cells[item][0]);
          } else if (this.cells[item][0].kind === 'B') {
            tempCells = this.cellsOfBishop(this.cells[item][0]);
          } else if (this.cells[item][0].kind === 'N') {
            tempCells = this.cellsOfKnight(this.cells[item][0]);
          } else if (this.cells[item][0].kind === 'Q') {
            tempCells = this.cellsOfQueen(this.cells[item][0]);
          }

          tempCells.forEach(function(element) {
            forbiddenCells.push(element);
          });
        }

        // Must add the forbidden cells for King
        if (!this.whiteTurn) {
          threatedCells = this.blackForbiddenCells;
        } else {
          threatedCells = this.whiteForbiddenCells;
        }

        threatedCells.forEach(function(element) {
          forbiddenCells.push(element);
        });

        forbiddenCells = Array.from(new Set(forbiddenCells));

        console.log('Forbidden cells');
        console.log(forbiddenCells);

        if (!this.samePieceClicked) {
          for (const item of this.currentPiece['cellsToPaint']) {
            // check if the cell is not under attack
            const found = forbiddenCells.find(element => element === item);

            if (found === undefined) {
              // If the cell is not under attack King can move to this cell
              this.currentCellsToPaint.push(item);
              this.status[item] = false;
            }
          }
        }
      } else {
        if (!this.samePieceClicked) {
          for (const item of this.currentPiece['cellsToPaint']) {
            this.currentCellsToPaint.push(item);
            this.status[item] = false;
          }
        }
      }
    }
  }

  private reviewIfWhiteCheck(): void {
    this.blackThreatPieces = [];
    this.blackCheck = false;
    this.blackThreatPieces = this.check(this.cells[this.pieceAlive.c45.currentCell][0]);
    console.log('reviewIfBlackCheck threat pieces');
    console.log(this.blackThreatPieces);
    if (this.blackThreatPieces.length > 0) {
      this.blackCheck = true;
      this.currentMove.white = this.currentMove.white.concat('+');
    }
  }

  private reviewIfBlackCheck(): void {
    this.whiteThreatPieces = [];
    this.whiteCheck = false;
    this.whiteThreatPieces = this.check(this.cells[this.pieceAlive.c15.currentCell][0]);
    console.log('reviewIfWhiteCheck threat pieces');
    console.log(this.whiteThreatPieces);
    if (this.whiteThreatPieces.length > 0) {
      this.whiteCheck = true;
      this.currentMove.black = this.currentMove.black.concat('+');
    }
  }

  private reviewWhitePinnedPieces(): void {
    this.whitePinnedPieces = [];
    this.whitePinnedPieces = this.checkPinnedPieces(this.cells[this.pieceAlive.c15.currentCell][0]);
    console.log('reviewWhitePinnedPieces pinned pieces');
    console.log(this.whitePinnedPieces);
  }

  private reviewBlackPinnedPieces(): void {
    this.blackPinnedPieces = [];
    this.blackPinnedPieces = this.checkPinnedPieces(this.cells[this.pieceAlive.c45.currentCell][0]);
    console.log('reviewBlackPinnedPieces pinned pieces');
    console.log(this.blackPinnedPieces);
  }

  private setForbiddenCells(color: string) {
    let tempCells = [];
    let forbiddenCells = [];
    let piecePosition = '';
    console.log('setForbiddenCells');
    for (const item in this.pieceAlive) {
      if (this.pieceAlive[item].alive === true && this.pieceAlive[item].color === color) {
        piecePosition = this.pieceAlive[item].currentCell;
        // console.log(item);
        // console.log(piecePosition);
        switch(this.pieceAlive[item].currentKind) {
          case 'P': {
            tempCells = this.cellsOfPawn(this.cells[piecePosition][0]);
            break;
          }
          case 'R': {
            tempCells = this.cellsOfRock(this.cells[piecePosition][0]);
            break;
          }
          case 'N': {
            tempCells = this.cellsOfKnight(this.cells[piecePosition][0]);
            break;
          }
          case 'B': {
            tempCells = this.cellsOfBishop(this.cells[piecePosition][0]);
            break;
          }
          case 'Q': {
            tempCells = this.cellsOfQueen(this.cells[piecePosition][0]);
            break;
          }
          case 'K': {
            tempCells = this.cellsOfKing(this.cells[piecePosition][0]);
            break;
          }
        }

        tempCells.forEach(function(element) {
          forbiddenCells.push(element);
        });

        forbiddenCells = Array.from(new Set(forbiddenCells));
      }
    }
    return forbiddenCells;
  }

  drop(event: CdkDragDrop<string[]>) {
    let file = '';
    let rank = '';

    if (event.previousContainer !== event.container) {
      let currentNotationMove = '';
      let dataToSend: DataToPromote;
      let takesPiece = false;
      let pieceTaked = {};
      this.previousName = event.previousContainer.element.nativeElement.getAttribute('name');
      this.currentName = event.container.element.nativeElement.getAttribute('name');

      console.log('drop method');

      // console.log(this.currentName)
      // console.log(this.previousName)
      // console.log(this.cells[this.currentName])
      this.currentPiece = this.cells[this.previousName][0];
      file = this.currentPiece['currentPosition'];
      rank = this.currentPiece['currentPosition'];
      file = file.substring(0, 1);
      rank = rank.substring(1, 2);

      // console.log(this.currentPiece['cvalue'])

      if (this.currentPiece['color'] === 'W' && !this.whiteTurn || this.currentPiece['color'] === 'B' && this.whiteTurn) {

        // console.log('currentName')
        // console.log(this.cells[this.currentName].length)
        // console.log('previousName')
        // console.log(this.cells[this.previousName].length)
        if (this.cells[this.currentName].length === 1) {
          takesPiece = true;
          pieceTaked = this.cells[this.currentName][0];
        }

        if (this.currentPiece['kind'] !== 'P' && this.currentPiece['kind'] !== 'K') {
          currentNotationMove = this.correctMoveNotation(file, rank, this.currentName, this.currentPiece);
        }

        this.currentPiece['counterOfMoves']++;
        this.currentPiece['previousPosition'] = this.previousName;
        this.currentPiece['currentPosition'] = this.currentName;
        this.cells[this.currentName][0] = this.currentPiece ;

        this.colorOfCurrentMove[this.cellOfLastMove.pop()] = false;
        this.colorOfCurrentMove[this.cellOfLastMove.pop()] = false;

        this.cellOfLastMove.push(this.previousName);
        this.cellOfLastMove.push(this.currentName);

        this.colorOfCurrentMove[this.previousName] = true;
        this.colorOfCurrentMove[this.currentName] = true;

        while (event.container.data.length > 0) {
          this.dato = event.container.data.pop();
        }

        console.log('Takes piece');
        console.log(takesPiece);
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);

        this.currentTurn = new Turn();

        // one move per team
        if (!this.whiteTurn) {
          // white is moving
          this.turnNumber++;
          this.currentTurn.turnNumber = this.turnNumber;
          this.currentTurn.piece = this.currentPiece;
          this.whiteMoves.push(this.currentTurn);

          this.currentMove = {turn: 0, white: '', black: ''};
          this.currentMove.turn = this.turnNumber;

          if (this.currentPiece['kind'] === 'P') {
            if (takesPiece) {
              this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
              this.pieceAlive[pieceTaked['cid']].alive = false;

              this.currentMove.white = this.file.concat('x').concat(this.currentName);
            } else {
              this.currentMove.white = this.currentName;
            }

            this.reviewWhitePinnedPieces();
            this.reviewBlackPinnedPieces();
            this.reviewIfWhiteCheck();

            this.pieceAlive[this.cells[this.currentName][0].cid].currentCell = this.currentName;
            if (this.currentName.substring(1, 2) === '8') {
              // Promote
              dataToSend = {turn: this.currentMove.turn, piece: this.currentPiece['cvalue'],
                            currentCell: this.currentName, setOfPieces: this.whitePieces, selected: '', pieceColor: 'W'};
              this.openDialog(dataToSend);
            }
          } else {
            if (takesPiece) {
              this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
              this.pieceAlive[pieceTaked['cid']].alive = false;
              // You cannot make check with King
              if (this.currentPiece['kind'] === 'K') {
                this.currentMove.white = this.currentPiece['kind'].concat('x').concat(this.currentName);
              } else {
                this.currentMove.white = currentNotationMove.concat('x').concat(this.currentName);
                this.reviewWhitePinnedPieces();
                this.reviewBlackPinnedPieces();
                this.reviewIfWhiteCheck();
              }
            } else {
              // You cannot make check with King
              if (this.currentPiece['kind'] === 'K') {
                this.currentMove.white = this.currentPiece['kind'].concat(this.currentName);
              } else {
                this.currentMove.white = currentNotationMove.concat(this.currentName);
                this.reviewWhitePinnedPieces();
                this.reviewBlackPinnedPieces();
                this.reviewIfWhiteCheck();
              }
            }

            this.pieceAlive[this.cells[this.currentName][0].cid].currentCell = this.currentName;
          }

          // If your move is the en Passant remove the opponent pawn
          if (this.whiteEnPassantMove !== '' && this.whiteEnPassantMove === this.currentName) {
            pieceTaked = this.cells[this.whiteEnPassantOpponentPosition][0];

            this.cells[this.whiteEnPassantOpponentPosition] = [];
            this.whiteEnPassantMove = '';
            this.whiteEnPassantOpponentPosition = '';

            this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
            this.pieceAlive[pieceTaked['cid']].alive = false;

            this.currentMove.white = this.file.concat('x').concat(this.currentName).concat('e.p.');

            this.reviewWhitePinnedPieces();
            this.reviewBlackPinnedPieces();
            this.reviewIfWhiteCheck();
          }

          // If your move is short castling
          if (this.whiteShortCastlingMove !== '' && this.whiteShortCastlingMove === this.currentName) {
            this.cells['f1'].push(this.cells['h1'][0]);
            this.cells['f1'][0]['counterOfMoves']++;
            this.cells['f1'][0]['previousPosition'] = 'h1';
            this.cells['f1'][0]['currentPosition'] = 'f1';
            this.pieceAlive[this.cells['f1'][0].cid].currentCell = 'f1';
            this.cells['h1'] = [];
            this.whiteShortCastlingMove = '';
            this.currentMove.white = 'O-O';
            this.reviewWhitePinnedPieces();
            this.reviewBlackPinnedPieces();
            this.reviewIfWhiteCheck();
          }

          // If your move is long castling
          if (this.whiteLongCastlingMove !== '' && this.whiteLongCastlingMove === this.currentName) {
            this.cells['d1'].push(this.cells['a1'][0]);
            this.cells['d1'][0]['counterOfMoves']++;
            this.cells['d1'][0]['previousPosition'] = 'a1';
            this.cells['d1'][0]['currentPosition'] = 'd1';
            this.pieceAlive[this.cells['d1'][0].cid].currentCell = 'd1';
            this.cells['a1'] = [];
            this.whiteLongCastlingMove = '';
            this.currentMove.white = 'O-O-O';
            this.reviewWhitePinnedPieces();
            this.reviewBlackPinnedPieces();
            this.reviewIfWhiteCheck();
          }

          // this.currentMove.black = ''
          this.whiteForbiddenCells = this.setForbiddenCells('W');
          ELEMENT_DATA.push(this.currentMove);
          this.gameMoves.data.next(ELEMENT_DATA);
        } else {
          // black is moving
          this.currentTurn.turnNumber = this.turnNumber;
          this.currentTurn.piece  = this.currentPiece;
          this.blackMoves.push(this.currentTurn);

          this.currentMove = ELEMENT_DATA.pop();

          if (this.currentPiece['kind'] === 'P') {
            if (takesPiece) {
              this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
              this.pieceAlive[pieceTaked['cid']].alive = false;

              this.currentMove.black = this.file.concat('x').concat(this.currentName);
            } else {
              this.currentMove.black = this.currentName;
            }

            this.reviewBlackPinnedPieces();
            this.reviewWhitePinnedPieces();
            this.reviewIfBlackCheck();

            this.pieceAlive[this.cells[this.currentName][0].cid].currentCell = this.currentName;
            if (this.currentName.substring(1, 2) === '1') {
              // Promote
              dataToSend = {turn: this.currentMove.turn, piece: this.currentPiece['cvalue'],
                            currentCell: this.currentName, setOfPieces: this.blackPieces, selected: '', pieceColor: 'B'}
              this.openDialog(dataToSend);
            }
          } else {
            if (takesPiece) {
              this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
              this.pieceAlive[pieceTaked['cid']].alive = false;

              // You cannot make check with King
              if (this.currentPiece['kind'] === 'K') {
                this.currentMove.black = this.currentPiece['kind'].concat('x').concat(this.currentName);
              } else {
                this.currentMove.black = currentNotationMove.concat('x').concat(this.currentName);
                this.reviewBlackPinnedPieces();
                this.reviewWhitePinnedPieces();
                this.reviewIfBlackCheck();
              }
            } else {
              // You cannot make check with King
              if (this.currentPiece['kind'] === 'K') {
                this.currentMove.black = this.currentPiece['kind'].concat(this.currentName);
              } else {
                this.currentMove.black = currentNotationMove.concat(this.currentName);
                this.reviewBlackPinnedPieces();
                this.reviewWhitePinnedPieces();
                this.reviewIfBlackCheck();
              }
            }

            this.pieceAlive[this.cells[this.currentName][0].cid].currentCell = this.currentName;
          }

          // If your move is the en Passant remove the opponent pawn
          if (this.blackEnPassantMove !== '' && this.blackEnPassantMove === this.currentName) {
            pieceTaked = this.cells[this.blackEnPassantOpponentPosition][0];

            this.cells[this.blackEnPassantOpponentPosition] = [];
            this.blackEnPassantMove = '';
            this.blackEnPassantOpponentPosition = '';

            this.pieceAlive[pieceTaked['cid']].capturedBy = this.cells[this.currentName][0].cid;
            this.pieceAlive[pieceTaked['cid']].alive = false;

            this.currentMove.black = this.file.concat('x').concat(this.currentName).concat('e.p.');
            this.reviewBlackPinnedPieces();
            this.reviewWhitePinnedPieces();
            this.reviewIfBlackCheck();
          }

          // If your move is short castling
          if (this.blackShortCastlingMove !== '' && this.blackShortCastlingMove === this.currentName) {
            this.cells['f8'].push(this.cells['h8'][0]);
            this.cells['f8'][0]['counterOfMoves']++;
            this.cells['f8'][0]['previousPosition'] = 'h8';
            this.cells['f8'][0]['currentPosition'] = 'f8';
            this.pieceAlive[this.cells['f8'][0].cid].currentCell = 'f8';
            this.cells['h8'] = [];
            this.blackShortCastlingMove = '';
            this.currentMove.black = 'O-O';
            this.reviewBlackPinnedPieces();
            this.reviewWhitePinnedPieces();
            this.reviewIfBlackCheck();
          }

          // If your move is long castling
          if (this.blackLongCastlingMove !== '' && this.blackLongCastlingMove === this.currentName) {
            this.cells['d8'].push(this.cells['a8'][0]);
            this.cells['d8'][0]['counterOfMoves']++;
            this.cells['d8'][0]['previousPosition'] = 'a8';
            this.cells['d8'][0]['currentPosition'] = 'd8';
            this.pieceAlive[this.cells['d8'][0].cid].currentCell = 'd8';
            this.cells['a8'] = [];
            this.blackLongCastlingMove = '';
            this.currentMove.black = 'O-O-O';
            this.reviewBlackPinnedPieces();
            this.reviewWhitePinnedPieces();
            this.reviewIfBlackCheck();
          }

          console.log(this.currentMove);
          this.blackForbiddenCells = this.setForbiddenCells('B');
          ELEMENT_DATA.push(this.currentMove);
          this.gameMoves.data.next(ELEMENT_DATA);
        }

        this.whiteTurn = !this.whiteTurn;
        this.disablePiece(this.whiteTurn);

        console.log('Game resume');
        console.log(this.whiteTurn);
        console.log(this.whiteMoves);
        console.log(this.blackMoves);
        console.log(this.whiteForbiddenCells);
        console.log(this.blackForbiddenCells);
        console.log(this.whitePinnedPieces);
        console.log(this.blackPinnedPieces);
        console.log(this.pieceAlive);
        console.log(this.cells);
        //  console.log(event.container.data)
      }
    }
  }
}
