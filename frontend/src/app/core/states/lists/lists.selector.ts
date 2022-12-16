import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { List, ListsState } from './lists.models';

export const selectLists = createFeatureSelector<ListsState>('lists');

export const selectListItems = createSelector(
  selectLists,
  (state) => state.lists
);

export const selectList = (props: { id: string }) =>
  createSelector(
    selectLists,
    (state: ListsState) =>
      state.lists.find((list) => list._id === props.id) as List
  );

export const selectArchiveList = createSelector(selectLists, (state) =>
  state.lists.find((list) => list.name === 'Archive')
);

export const selectStatus = createSelector(
  selectLists,
  (state: ListsState) => state.status
);

export const selectError = createSelector(
  selectLists,
  (state: ListsState) => state.error
);
