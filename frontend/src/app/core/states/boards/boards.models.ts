import { List } from '../lists';

export interface Board {
  _id: string;
  name: string;
  userID: string;
  description: string;
  background: string;
  created_date: string;
  lists: List[];
}

export interface BoardsState {
  boards: Board[];
  editableBoard: Board | null;
  error: string | null;
  status: string;
}
