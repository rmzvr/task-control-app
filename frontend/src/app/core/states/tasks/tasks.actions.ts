import { createAction, props } from '@ngrx/store';
import { Task } from './tasks.models';

export const addTask = createAction(
  '[Board Page] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Board Page] Add Task Success',
  props<{ boardID: string | null }>()
);

export const addTaskFailed = createAction(
  '[Board Page] Add Task Failed',
  props<{ error: any }>()
);

export const updateTask = createAction(
  '[Board Page] Update Task',
  props<{ task: any }>()
);

export const updateTaskSuccess = createAction(
  '[Board Page] Update Task Success',
  props<{ boardID: string }>()
);

export const updateTaskFailed = createAction(
  '[Board Page] Update Task Failed',
  props<{ error: any }>()
);

export const deleteTask = createAction(
  '[Board Page] Delete Task',
  props<{ task: Task }>()
);

export const deleteTaskSuccess = createAction(
  '[Board Page] Delete Task Success',
  props<{ boardID: string }>()
);

export const deleteTaskFailed = createAction(
  '[Board Page] Delete Task Failed',
  props<{ error: any }>()
);

export const setCurrentTask = createAction(
  '[Board Page] Set Current Task',
  props<{ task: Task }>()
);

export const loadTasks = createAction(
  '[Board Page] Load Tasks',
  props<{ boardID: string | null }>()
);

export const loadTasksSuccess = createAction(
  '[Tasks API] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailed = createAction(
  '[Tasks API] Load Tasks Failed',
  props<{ error: any }>()
);
