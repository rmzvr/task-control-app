import { createReducer, on } from '@ngrx/store';
import { updateOrder, updateSearch, updateSort } from './toolbar.actions';
import { initialState } from './toolbar.state';

export const toolbarReducer = createReducer(
  initialState,
  on(updateSearch, (state, { value }) => ({
    ...state,
    search: value,
  })),
  on(updateSort, (state, { value }) => ({
    ...state,
    sort: value,
  })),
  on(updateOrder, (state, { value }) => ({
    ...state,
    order: value,
  }))
);
