import { ListsState } from '../../models/lists.models';

export const initialState: ListsState = {
  lists: [],
  error: null,
  status: 'pending',
};
