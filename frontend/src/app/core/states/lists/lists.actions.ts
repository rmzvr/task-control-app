import { createAction, props } from '@ngrx/store';
import { List } from '../../models/lists.models';

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
  props<{ boardID: string }>()
);

export const loadListsSuccess = createAction(
  '[Lists API] Load Lists Success',
  props<{ lists: List[] }>()
);

export const loadListsFailed = createAction(
  '[Lists API] Load Lists Failed',
  props<{ error: any }>()
);
