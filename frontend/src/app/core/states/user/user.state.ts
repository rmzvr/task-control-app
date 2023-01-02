import { UserState } from '../../models/user.models';

export const initialState: UserState = {
  user: null,
  error: null,
  status: 'pending',
};
