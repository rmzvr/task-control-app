import { createReducer, on } from '@ngrx/store';
import {
  registerUser,
  registerUserFailed,
  registerUserSuccess,
  loadUser,
  loadUserFailed,
  loadUserSuccess,
} from './user.actions';
import { UserState } from './user.models';
import { initialState } from './user.state';

export const userReducer = createReducer(
  initialState,

  on(registerUser, (state: UserState, { user }) => ({
    ...state,
    user,
  })),

  on(registerUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  on(registerUserFailed, (state, { error }) => ({
    ...state,
    error,
  })),

  on(loadUser, (state: UserState) => ({
    ...state,
  })),

  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  on(loadUserFailed, (state, { error }) => ({
    ...state,
    error,
  }))
);
