import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from './comments.models';

export const selectComments = createFeatureSelector<CommentsState>('comments');

export const selectTaskComments = createSelector(
  selectComments,
  (state: CommentsState) => state.comments
);

export const selectCurrentComment = createSelector(
  selectComments,
  (state: CommentsState) => state.currentComment
);

export const selectComment = (props: { id: string }) =>
  createSelector(selectComments, (state: CommentsState) =>
    state.comments.find((comment) => comment._id === props.id)
  );
