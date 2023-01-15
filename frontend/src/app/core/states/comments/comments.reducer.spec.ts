import {
  addComment,
  deleteComment,
  loadCommentsSuccess,
  setCurrentComment,
  updateComment,
} from './comments.actions';
import { commentsReducer } from './comments.reducer';
import { initialState } from './comments.state';

describe('commentsReducer', () => {
  const comment = {
    _id: '1',
    name: 'Comment',
    taskID: '1',
    boardID: '1',
    created_date: new Date().toDateString(),
  };

  const initState = {
    ...initialState,
    comments: [comment],
  };

  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'unknown',
      };

      const state = commentsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('addComment action', () => {
    it('should add new comment', () => {
      const action = addComment({ comment });

      const state = commentsReducer(initialState, action);

      expect(state.comments.length).toBe(1);
      expect(state.comments[0]).toEqual(comment);
    });
  });

  describe('updatedComment action', () => {
    it('should update exist comment', () => {
      const updatedComment = {
        _id: '1',
        name: 'Updated comment',
        taskID: '1',
        boardID: '1',
        created_date: new Date().toDateString(),
      };

      const action = updateComment({ comment: updatedComment });

      const state = commentsReducer(initState, action);

      expect(state.comments[0].name).toBe(updatedComment.name);
    });

    it("should not update doesn't exist comment", () => {
      const updatedComment = {
        _id: '5',
        name: 'Updated comment',
        taskID: '1',
        boardID: '1',
        created_date: new Date().toDateString(),
      };

      const action = updateComment({ comment: updatedComment });

      const state = commentsReducer(initState, action);

      expect(state.comments[0].name).toBe(initState.comments[0].name);
    });
  });

  describe('deleteComment action', () => {
    it('should delete exist comment', () => {
      const action = deleteComment({ comment });

      const state = commentsReducer(initState, action);

      expect(state.comments.length).toBe(0);
    });

    it("should not delete doesn't exist comment", () => {
      const commentToDelete = {
        _id: '5',
        name: 'Comment 1',
        taskID: '2',
        boardID: '2',
        created_date: new Date().toDateString(),
      };

      const action = deleteComment({ comment: commentToDelete });

      const state = commentsReducer(initState, action);

      expect(state.comments.length).toBe(1);
    });
  });

  describe('loadCommentsSuccess action', () => {
    it('should update the comments state in an immutable way', () => {
      const comments = [comment, comment, comment];

      const action = loadCommentsSuccess({ comments });

      const state = commentsReducer(initialState, action);

      expect(state.comments).toEqual(comments);
      expect(state.comments).not.toBe(initialState.comments);
    });
  });

  describe('setCurrentComment action', () => {
    it('should set current comment', () => {
      const action = setCurrentComment({ comment });

      const state = commentsReducer(initialState, action);

      expect(state.currentComment).toBeTruthy();
    });
  });
});
