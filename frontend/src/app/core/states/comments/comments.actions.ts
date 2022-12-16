import { createAction, props } from '@ngrx/store';
import { Comment } from './comments.models';

export const addComment = createAction(
  '[Board Page] Add Comment',
  props<{ comment: Comment }>()
);

export const addCommentSuccess = createAction(
  '[Board Page] Add Comment Success',
  props<{ boardID: any }>()
);

export const addCommentFailed = createAction(
  '[Board Page] Add Comment Failed',
  props<{ error: any }>()
);

export const updateComment = createAction(
  '[Board Page] Update Comment',
  props<{ comment: any }>()
);

export const updateCommentSuccess = createAction(
  '[Board Page] Update Comment Success',
  props<{ boardID: string }>()
);

export const updateCommentFailed = createAction(
  '[Board Page] Update Comment Failed',
  props<{ error: any }>()
);

export const deleteComment = createAction(
  '[Board Page] Delete Comment',
  props<{ comment: Comment }>()
);

export const deleteCommentSuccess = createAction(
  '[Board Page] Delete Comment Success',
  props<{ boardID: any }>()
);

export const deleteCommentFailed = createAction(
  '[Board Page] Delete Comment Failed',
  props<{ error: any }>()
);

export const loadComments = createAction(
  '[Board Page] Load Comments',
  props<{ boardID: string | null }>()
);

export const loadCommentsSuccess = createAction(
  '[Comments API] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailed = createAction(
  '[Comments API] Load Comments Failed',
  props<{ error: any }>()
);

export const setCurrentComment = createAction(
  '[Board Page] Set Current Comment',
  props<{ comment: Comment }>()
);
