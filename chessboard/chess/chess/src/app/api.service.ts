import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:5762';
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    })
   };

  public getGameByEvent(event: string) {}

  public getGames() {
    return this.httpClient.get<Game[]>(`${this.apiURL}/games`, this.httpOptions );
  }
}
