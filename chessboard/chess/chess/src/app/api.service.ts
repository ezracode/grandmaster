import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://localhost:5762';
  constructor(private httpClient: HttpClient) { }

  public getGameByEvent(event: string){}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'X-Requested-With'
    })
   };

  public getGames(){
    return this.httpClient.get<Game[]>(`${this.apiURL}/games`, this.httpOptions );
  }
}
