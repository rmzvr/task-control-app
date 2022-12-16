import { createAction, props } from '@ngrx/store';

export const toggleModal = createAction('[Dashboard Page] Toggle Modal');

export const setAddBoardFormActive = createAction(
  '[Dashboard Page] Set Add Board Form Active'
);

export const toggleAddBoardModal = createAction(
  '[Dashboard Page] Toggle Add Board Modal'
);

export const toggleUpdateBoardModal = createAction(
  '[Dashboard Page] Toggle Edit Board Modal'
);

export const updateModalTitle = createAction(
  '[Dashboard Page] Update modal title',
  props<{ title: string }>()
);

export const toggleTaskModal = createAction(
  '[Dashboard Page] Toggle Task Modal'
);

export const toggleTaskMenu = createAction('[Dashboard Page] Toggle Task Menu');

export const updateTaskMenuPosition = createAction(
  '[Dashboard Page] Unset Edit Board Form Active',
  props<{ x: number; y: number; width: number; height: number }>()
);
