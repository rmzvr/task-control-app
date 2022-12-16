import { Injectable } from '@angular/core';
import { ListService } from '@features/board/services/list/list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';

import {
  addList,
  addListSuccess,
  addListFailed,
  updateList,
  updateListSuccess,
  updateListFailed,
  loadLists,
  loadListsSuccess,
  loadListsFailed,
} from '../lists';

@Injectable()
export class ListsEffects {
  constructor(private actions$: Actions, private listService: ListService) {}

  loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLists, addListSuccess, updateListSuccess),
      switchMap((action) =>
        from(
          this.listService.getLists(action.boardID).pipe(
            map((lists: any) => loadListsSuccess({ lists: lists })),
            catchError((error) => of(loadListsFailed({ error })))
          )
        )
      )
    )
  );

  addList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addList),
      switchMap((action) =>
        this.listService.addList(action.list).pipe(
          map(() => addListSuccess({ boardID: action.list.boardID })),
          catchError((error) => of(addListFailed({ error })))
        )
      )
    )
  );

  updateList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateList),
      switchMap((action) =>
        this.listService.updateList(action.list).pipe(
          map(() => updateListSuccess({ boardID: action.list.boardID })),
          catchError((error) => of(updateListFailed({ error })))
        )
      )
    )
  );
}
