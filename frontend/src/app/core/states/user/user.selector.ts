import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.models';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectStatus = createSelector(
  selectUserState,
  (state: UserState) => state.status
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
