import { createAction, props } from '@ngrx/store';
import { Board } from './boards.models';

// ADD BOARD ===============================>
export const addBoard = createAction(
  '[Dashboard Page] Add Board',
  props<{ board: Board }>()
);

export const addBoardSuccess = createAction(
  '[Dashboard Page] Add Board Success',
  props<{ id: string }>()
);

export const addBoardFailed = createAction(
  '[Dashboard Page] Add Board Failed',
  props<{ error: any }>()
);

// EDIT BOARD ==============================>
export const updateBoard = createAction(
  '[Dashboard Page] Edit Board',
  props<{ board: Board }>()
);

export const updateBoardSuccess = createAction(
  '[Dashboard Page] Edit Board Success',
  props<{ id: string }>()
);

export const updateBoardFailed = createAction(
  '[Dashboard Page] Edit Board Failed',
  props<{ error: any }>()
);

// DELETE BOARD ==============================>
export const deleteBoard = createAction(
  '[Dashboard Page] Delete Board',
  props<{ board: Board }>()
);

export const deleteBoardSuccess = createAction(
  '[Dashboard Page] Delete Board Success',
  props<{ id: string }>()
);

export const deleteBoardFailed = createAction(
  '[Dashboard Page] Delete Board Failed',
  props<{ error: any }>()
);

// LOAD BOARDS ==============================>
export const loadBoards = createAction(
  '[Dashboard Page] Load Boards',
  props<{ id: string }>()
);

export const loadBoardsSuccess = createAction(
  '[Boards API] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const loadBoardsFailed = createAction(
  '[Boards API] Load Boards Failed',
  props<{ error: any }>()
);

// SET EDITABLE BOARD ==============================>
export const setEditableBoard = createAction(
  '[Dashboard Page] Set Editable Board',
  props<{ board: Board }>()
);
