import { Injectable } from '@angular/core';
import { UserService } from '@features/board/services/user/user.service';
import { LoginService } from '@features/login/services/login.service';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailed,
  registerUser,
  registerUserSuccess,
  registerUserFailed,
  loginUser,
  loginUserSuccess,
  loginUserFailed,
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() =>
        from(
          this.userService.getUser().pipe(
            map((user: any) => loadUserSuccess({ user })),
            catchError((error) => of(loadUserFailed({ error })))
          )
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap((action) =>
        from(
          this.loginService.registerUser(action.user).pipe(
            map((user: any) => registerUserSuccess({ user })),
            catchError((error) => of(registerUserFailed({ error })))
          )
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((action) =>
        from(
          this.loginService.loginUser(action.user).pipe(
            map((user: any) => loginUserSuccess({ user })),
            catchError((error) => of(loginUserFailed({ error })))
          )
        )
      )
    )
  );
}
