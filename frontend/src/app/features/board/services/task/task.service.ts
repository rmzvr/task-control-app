import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@core/states/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTasksByBoardID(id: string): Observable<Task[]> {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/tasks/board/?boardID=${id}`
    ) as Observable<Task[]>;
  }

  public addTask(task: Task): Observable<string> {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/tasks/?listID=${task.listID}`,
      task
    ) as Observable<string>;
  }

  public updateTask(task: Task): Observable<string> {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/tasks/${task._id}`,
      task
    ) as Observable<string>;
  }

  public deleteTask(task: Task): Observable<string> {
    return this.http.delete(
      `https://serene-plains-22341.herokuapp.com/api/tasks/${task._id}`
    ) as Observable<string>;
  }
}
