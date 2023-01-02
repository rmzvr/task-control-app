import { BoardsState } from '../../models/boards.models';

export const initialState: BoardsState = {
  boards: [],
  editableBoard: null,
  error: null,
  status: 'pending',
};
