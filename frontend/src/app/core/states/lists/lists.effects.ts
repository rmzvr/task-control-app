import { Injectable } from '@angular/core';
import { ListService } from '@features/board/services/list/list.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';

import {
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
      ofType(loadLists, updateListSuccess),
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
