import { createReducer, on } from '@ngrx/store';
import { ListsState } from '../../models/lists.models';
import {
  loadLists,
  loadListsSuccess,
  loadListsFailed,
  updateList,
  updateListSuccess,
  updateListFailed,
} from './lists.actions';
import { initialState } from './lists.state';

export const listsReducer = createReducer(
  initialState,

  on(updateList, (state, { list }) => {
    const listIndex = state.lists.findIndex((l) => l._id === list._id);
    const updatedLists = [...state.lists];
    updatedLists[listIndex] = list;

    return {
      ...state,
      lists: updatedLists,
      status: 'loading',
    };
  }),

  on(updateListSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  on(updateListFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),

  on(loadLists, (state: ListsState) => ({
    ...state,
    status: 'loading',
  })),

  on(loadListsSuccess, (state, { lists }) => ({
    ...state,
    lists: lists,
    status: 'success',
  })),

  on(loadListsFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  }))
);
