import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export const registerUser = createAction(
  '[User API] Register User',
  props<{ user: User }>()
);

export const registerUserSuccess = createAction(
  '[User API] Register User Success',
  props<{ user: User }>()
);

export const registerUserFailed = createAction(
  '[User API] Register User Failed',
  props<{ error: any }>()
);

export const loginUser = createAction(
  '[User API] Login User',
  props<{ user: User }>()
);

export const loginUserSuccess = createAction(
  '[User API] Login User Success',
  props<{ user: User }>()
);

export const loginUserFailed = createAction(
  '[User API] Login User Failed',
  props<{ error: any }>()
);

export const loadUser = createAction('[Board Page] Load User');

export const loadUserSuccess = createAction(
  '[User API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailed = createAction(
  '[User API] Load User Failed',
  props<{ error: any }>()
);
