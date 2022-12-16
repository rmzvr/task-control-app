import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalsState } from './modals.models';

export const selectModals = createFeatureSelector<ModalsState>('modals');

export const selectIsModalOpen = createSelector(
  selectModals,
  (state: ModalsState) => state.isModalOpen
);

export const selectModalTitle = createSelector(
  selectModals,
  (state: ModalsState) => state.title
);

export const selectModalTaskOpen = createSelector(
  selectModals,
  (state: ModalsState) => state.isTaskModalOpen
);

export const selectIsTaskMenuOpen = createSelector(
  selectModals,
  (state: ModalsState) => state.isTaskMenuOpen
);

export const selectIsAddBoardModalOpen = createSelector(
  selectModals,
  (state: ModalsState) => state.isAddBoardModalOpen
);

export const selectIsEditBoardModalOpen = createSelector(
  selectModals,
  (state: ModalsState) => state.isEditBoardModalOpen
);

export const selectEditTaskMenuPosition = createSelector(
  selectModals,
  (state: ModalsState) => state.editTaskMenuPosition
);
