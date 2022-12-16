import { Injectable } from '@angular/core';
import { TaskService } from '@features/board/services/task/task.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {
  addTask,
  addTaskSuccess,
  addTaskFailed,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailed,
  updateTask,
  updateTaskSuccess,
  updateTaskFailed,
  loadTasks,
  loadTasksSuccess,
  loadTasksFailed,
} from './tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks, addTaskSuccess, updateTaskSuccess, deleteTaskSuccess),
      switchMap((action) =>
        from(
          this.taskService.getTasksByBoardID(action.boardID).pipe(
            map((tasks: any) => loadTasksSuccess({ tasks })),
            catchError((error) => of(loadTasksFailed({ error })))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      switchMap((action) =>
        this.taskService.addTask(action.task).pipe(
          map(() => addTaskSuccess({ boardID: action.task.boardID })),
          catchError((error) => of(addTaskFailed({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      switchMap((action) =>
        this.taskService.updateTask(action.task).pipe(
          map(() => updateTaskSuccess({ boardID: action.task.boardID })),
          catchError((error) => of(updateTaskFailed({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) =>
        this.taskService.deleteTask(action.task).pipe(
          map(() => deleteTaskSuccess({ boardID: action.task.boardID })),
          catchError((error) => of(deleteTaskFailed({ error })))
        )
      )
    )
  );
}
