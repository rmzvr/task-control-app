import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from '@core/states/lists';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  public getLists(boardID: string): Observable<List[]> {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/lists/?boardID=${boardID}`
    ) as Observable<List[]>;
  }

  public updateList(list: List): Observable<string> {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/lists/${list._id}`,
      {
        background: list.background,
      }
    ) as Observable<string>;
  }
}
