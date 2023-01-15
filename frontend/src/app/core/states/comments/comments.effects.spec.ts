import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TestScheduler } from 'rxjs/testing';
import { CommentsEffects } from './comments.effects';
import { CommentService } from '@features/board/services/comment/comment.service';
import {
  addComment,
  addCommentSuccess,
  deleteComment,
  deleteCommentSuccess,
  loadComments,
  loadCommentsSuccess,
  updateComment,
  updateCommentSuccess,
} from './comments.actions';

describe('CommentsEffects', () => {
  const initialState = { boards: [] };
  const commentService = jasmine.createSpyObj('commentService', [
    'getCommentsByBoardID',
    'addComment',
    'updateComment',
    'deleteComment',
  ]);
  let effects: CommentsEffects;
  let actions: Observable<any>;
  let testScheduler: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CommentsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: CommentService, useValue: commentService },
      ],
    }).compileComponents();

    effects = TestBed.inject(CommentsEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    effects = TestBed.inject(CommentsEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('loadComments$', () => {
    it('should handle loadComments and return a loadCommentsSuccess action', () => {
      const comments: any[] = [];
      const action = loadComments({ boardID: '1' });
      const outcome = loadCommentsSuccess({ comments });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: comments });
        commentService.getCommentsByBoardID.and.returnValue(response);

        helpers
          .expectObservable(effects.loadComments$)
          .toBe('--b', { b: outcome });
      });
    });
  });

  describe('addComment$', () => {
    it('should handle addComment and return a addCommentSuccess action', () => {
      const comment = {
        _id: 'string',
        name: 'string',
        taskID: 'string',
        boardID: '1',
        created_date: 'string',
      };
      const id = '1';
      const action = addComment({ comment });
      const outcome = addCommentSuccess({ boardID: id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: '1' } });
        commentService.addComment.and.returnValue(response);

        helpers
          .expectObservable(effects.addComment$)
          .toBe('--b', { b: outcome });
      });
    });
  });

  describe('updateComment$', () => {
    it('should handle updateComment and return a updateCommentSuccess action', () => {
      const comment = {
        _id: 'string',
        name: 'string',
        taskID: 'string',
        boardID: '1',
        created_date: 'string',
      };
      const id = '1';
      const action = updateComment({ comment });
      const outcome = updateCommentSuccess({ boardID: id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: '1' } });
        commentService.updateComment.and.returnValue(response);

        helpers.expectObservable(effects.updateComment$).toBe('--b', {
          b: outcome,
        });
      });
    });
  });

  describe('deleteComment$', () => {
    it('should handle deleteComment and return a deleteCommentSuccess action', () => {
      const comment = {
        _id: 'string',
        name: 'string',
        taskID: 'string',
        boardID: '1',
        created_date: 'string',
      };
      const id = '1';
      const action = deleteComment({ comment });
      const outcome = deleteCommentSuccess({ boardID: id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: '1' } });
        commentService.deleteComment.and.returnValue(response);

        helpers.expectObservable(effects.deleteComment$).toBe('--b', {
          b: outcome,
        });
      });
    });
  });
});
