import { createAction, props } from '@ngrx/store';

export const updateSearch = createAction(
  '[Dashboard Page] Update Search Value',
  props<{ value: string }>()
);

export const updateSort = createAction(
  '[Dashboard Page] Update Sort',
  props<{ value: string }>()
);

export const updateOrder = createAction(
  '[Dashboard Page] Update Order',
  props<{ value: string }>()
);
