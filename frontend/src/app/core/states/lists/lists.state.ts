import { ListsState } from './lists.models';

export const initialState: ListsState = {
  lists: [],
  error: null,
  status: 'pending',
};
