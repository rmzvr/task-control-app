import { createReducer, on } from '@ngrx/store';
import { BoardsState } from './boards.models';
import {
  addBoard,
  updateBoard,
  deleteBoard,
  loadBoards,
  loadBoardsFailed,
  loadBoardsSuccess,
  setEditableBoard,
  addBoardSuccess,
  addBoardFailed,
  updateBoardSuccess,
  updateBoardFailed,
  deleteBoardSuccess,
  deleteBoardFailed,
} from './boards.actions';
import { initialState } from './boards.state';

export const boardsReducer = createReducer(
  initialState,
  
  on(addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
    status: 'loading',
  })),

  on(addBoardSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  on(addBoardFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),

  on(updateBoard, (state, { board }) => {
    const updatedBoards = [...state.boards];

    const boardIndex = updatedBoards.findIndex((b) => b._id === board._id);

    updatedBoards[boardIndex] = board;

    return {
      ...state,
      boards: updatedBoards,
      status: 'loading',
    };
  }),

  on(updateBoardSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  on(updateBoardFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),

  on(deleteBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.filter((b) => b._id !== board._id),
    status: 'loading',
  })),

  on(deleteBoardSuccess, (state) => ({
    ...state,
    status: 'success',
  })),

  on(deleteBoardFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),

  on(loadBoards, (state: BoardsState) => ({
    ...state,
    status: 'loading',
  })),

  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
    status: 'success',
  })),

  on(loadBoardsFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),

  on(setEditableBoard, (state, { board }) => ({
    ...state,
    editableBoard: board,
  }))
);
