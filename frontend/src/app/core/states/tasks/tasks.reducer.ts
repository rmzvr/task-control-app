import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  updateTask,
  deleteTask,
  setCurrentTask,
  loadTasks,
  loadTasksSuccess,
} from './tasks.actions';
import { TasksState } from './tasks.models';
import { initialState } from './tasks.state';

export const tasksReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(updateTask, (state, { task }) => {
    const copiedTasks = [...state.tasks];

    const currentTaskIndex = copiedTasks.findIndex((t) => t._id === task._id);

    copiedTasks.splice(currentTaskIndex, 1, task);

    return {
      ...state,
      tasks: copiedTasks,
    };
  }),

  on(deleteTask, (state, { task }) => {
    const copiedTasks = [...state.tasks];

    const currentTaskIndex = copiedTasks.findIndex((t) => t._id === task._id);

    copiedTasks.splice(currentTaskIndex, 1);

    return {
      ...state,
      tasks: copiedTasks,
    };
  }),

  on(setCurrentTask, (state, { task }) => ({
    ...state,
    currentTask: task,
  })),

  on(loadTasks, (state: TasksState) => ({
    ...state,
  })),

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
  }))
);
