import { BoardsState } from './boards.models';

export const initialState: BoardsState = {
  boards: [],
  editableBoard: null,
  error: null,
  status: 'pending',
};
