import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@core/states/tasks/tasks.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTasksByBoardID(id: string | null) {
    return this.http.get(
      `https://serene-plains-22341.herokuapp.com/api/tasks/board/?boardID=${id}`
    );
  }

  public addTask(task: Task) {
    return this.http.post(
      `https://serene-plains-22341.herokuapp.com/api/tasks/?listID=${task.listID}`,
      task
    );
  }

  public updateTask(task: Task) {
    return this.http.put(
      `https://serene-plains-22341.herokuapp.com/api/tasks/${task._id}`,
      task
    );
  }

  public deleteTask(task: Task) {
    return this.http.delete(
      `https://serene-plains-22341.herokuapp.com/api/tasks/${task._id}`
    );
  }
}
