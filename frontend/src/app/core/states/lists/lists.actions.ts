import { createAction, props } from '@ngrx/store';
import { List } from './lists.models';

export const addList = createAction(
  '[Board Page] Add List',
  props<{ list: List }>()
);

export const addListSuccess = createAction(
  '[Board Page] Add List Success',
  props<{ boardID: string }>()
);

export const addListFailed = createAction(
  '[Board Page] Add List Failed',
  props<{ error: any }>()
);

export const updateList = createAction(
  '[Board Page] Edit List',
  props<{ list: List }>()
);

export const updateListSuccess = createAction(
  '[Board Page] Edit List Success',
  props<{ boardID: string }>()
);

export const updateListFailed = createAction(
  '[Board Page] Edit List Failed',
  props<{ error: any }>()
);

export const loadLists = createAction(
  '[Board Page] Load Lists',
  props<{ boardID: string | null }>()
);

export const loadListsSuccess = createAction(
  '[Lists API] Load Lists Success',
  props<{ lists: List[] }>()
);

export const loadListsFailed = createAction(
  '[Lists API] Load Lists Failed',
  props<{ error: any }>()
);
