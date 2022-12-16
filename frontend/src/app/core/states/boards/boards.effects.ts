import { Injectable } from '@angular/core';
import { BoardService } from '@features/dashboard/services/board.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {
  addBoard,
  addBoardSuccess,
  addBoardFailed,
  updateBoard,
  updateBoardSuccess,
  updateBoardFailed,
  deleteBoard,
  deleteBoardSuccess,
  deleteBoardFailed,
  loadBoards,
  loadBoardsFailed,
  loadBoardsSuccess,
} from '../boards';

@Injectable()
export class BoardsEffects {
  constructor(private actions$: Actions, private boardsService: BoardService) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        loadBoards,
        addBoardSuccess,
        updateBoardSuccess,
        deleteBoardSuccess
      ),
      switchMap((action) =>
        from(
          this.boardsService.getBoards(action.id).pipe(
            map((boards: any) => loadBoardsSuccess({ boards: boards })),
            catchError((error) => of(loadBoardsFailed({ error })))
          )
        )
      )
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBoard),
      switchMap((action) =>
        this.boardsService.addBoard(action.board).pipe(
          map(() => addBoardSuccess({ id: action.board.userID })),
          catchError((error) => of(addBoardFailed({ error })))
        )
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBoard),
      switchMap((action) =>
        this.boardsService.updateBoard(action.board).pipe(
          map(() => updateBoardSuccess({ id: action.board.userID })),
          catchError((error) => of(updateBoardFailed({ error })))
        )
      )
    )
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoard),
      switchMap((action) =>
        this.boardsService.deleteBoard(action.board).pipe(
          map(() => deleteBoardSuccess({ id: action.board.userID })),
          catchError((error) => of(deleteBoardFailed({ error })))
        )
      )
    )
  );
}
