import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.models';

export const selectTasks = createFeatureSelector<TasksState>('tasks');

export const selectBoardTasks = createSelector(
  selectTasks,
  (state: TasksState) => state.tasks
);

export const selectCurrentTask = createSelector(
  selectTasks,
  (state: TasksState) => state.currentTask
);

export const selectTask = (props: { id: string }) =>
  createSelector(selectTasks, (state: TasksState) =>
    state.tasks.find((task) => task._id === props.id)
  );
