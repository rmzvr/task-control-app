import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '@core/states/lists';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  public getLists(boardID: string | null) {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/lists/?boardID=${boardID}`
    );
  }

  public addList(list: List) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/lists?boardID=${list.boardID}`,
      list
    );
  }

  public updateList(list: List) {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/lists/${list._id}`,
      {
        background: list.background,
      }
    );
  }
}
