import { Injectable } from '@angular/core';
import { CommentService } from '@features/board/services/comment/comment.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {
  addComment,
  addCommentFailed,
  addCommentSuccess,
  deleteComment,
  deleteCommentFailed,
  deleteCommentSuccess,
  loadComments,
  loadCommentsFailed,
  loadCommentsSuccess,
  updateComment,
  updateCommentFailed,
  updateCommentSuccess,
} from './comments.actions';

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) {}

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        loadComments,
        addCommentSuccess,
        updateCommentSuccess,
        deleteCommentSuccess
      ),
      switchMap((action) =>
        from(
          this.commentService.getCommentsByBoardID(action.boardID).pipe(
            map((comments: any) => loadCommentsSuccess({ comments })),
            catchError((error) => of(loadCommentsFailed({ error })))
          )
        )
      )
    )
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addComment),
      switchMap((action) =>
        this.commentService.addComment(action.comment).pipe(
          map(() => addCommentSuccess({ boardID: action.comment.boardID })),
          catchError((error) => of(addCommentFailed({ error })))
        )
      )
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateComment),
      switchMap((action) =>
        this.commentService.updateComment(action.comment).pipe(
          map(() => updateCommentSuccess({ boardID: action.comment.boardID })),
          catchError((error) => of(updateCommentFailed({ error })))
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteComment),
      switchMap((action) =>
        this.commentService.deleteComment(action.comment).pipe(
          map(() => deleteCommentSuccess({ boardID: action.comment.boardID })),
          catchError((error) => of(deleteCommentFailed({ error })))
        )
      )
    )
  );
}
