import { createReducer, on } from '@ngrx/store';
import {
  addComment,
  deleteComment,
  loadComments,
  loadCommentsSuccess,
  setCurrentComment,
  updateComment,
} from './comments.actions';
import { CommentsState } from './comments.models';
import { initialState } from './comments.state';

export const commentsReducer = createReducer(
  initialState,

  on(addComment, (state: CommentsState, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
  })),

  on(updateComment, (state: CommentsState, { comment }) => {
    const copiedComments = [...state.comments];

    const currentCommentIndex = copiedComments.findIndex(
      (c) => c._id === comment._id
    );

    copiedComments.splice(currentCommentIndex, 1, comment);

    return {
      ...state,
      comments: copiedComments,
    };
  }),

  on(deleteComment, (state: CommentsState, { comment }) => {
    const copiedComments = [...state.comments];

    const currentCommentIndex = copiedComments.findIndex(
      (c) => c._id === comment._id
    );

    copiedComments.splice(currentCommentIndex, 1);

    return {
      ...state,
      comments: copiedComments,
    };
  }),

  on(setCurrentComment, (state: CommentsState, { comment }) => ({
    ...state,
    currentComment: comment,
  })),

  on(loadComments, (state: CommentsState) => ({
    ...state,
  })),

  on(loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments: comments,
  }))
);
