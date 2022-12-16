import { UserState } from './user.models';

export const initialState: UserState = {
  user: null,
  error: null,
  status: 'pending',
};
