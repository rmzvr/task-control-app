import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.models';

export const selectBoards = createFeatureSelector<BoardsState>('boards');

export const selectBoardItems = createSelector(
  selectBoards,
  (state) => state.boards
);

export const selectBoard = (props: { id: string }) =>
  createSelector(selectBoards, (state: BoardsState) =>
    state.boards.find((board) => board._id === props.id)
  );

export const selectEditableBoard = createSelector(
  selectBoards,
  (state: BoardsState) => state.editableBoard
);

export const selectStatus = createSelector(
  selectBoards,
  (state: BoardsState) => state.status
);

export const selectError = createSelector(
  selectBoards,
  (state: BoardsState) => state.error
);
