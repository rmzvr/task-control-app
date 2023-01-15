import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '@core/states/boards';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  public getBoards(id: string): Observable<Board[]> {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/boards?userID=${id}`
    ) as Observable<Board[]>;
  }

  public getBoard(id?: string): Observable<Board> {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/boards/${id}`
    ) as Observable<Board>;
  }

  public addBoard(board: Board) {
    return this.http.post(
      'https://serene-plains-22341.herokuapp.com/api/boards',
      board
    );
  }

  public updateBoard(board: Board) {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/boards/${board._id}`,
      {
        name: board.name,
        background: board.background,
      }
    );
  }

  public deleteBoard(board: Board) {
    return this.http.delete(
      `https://serene-plains-22341.herokuapp.com/api/boards/${board._id}`
    );
  }
}
