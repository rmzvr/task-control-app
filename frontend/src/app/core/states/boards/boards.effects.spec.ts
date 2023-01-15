import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TestScheduler } from 'rxjs/testing';
import { BoardsEffects } from './boards.effects';
import { BoardService } from '@features/dashboard/services/board.service';
import {
  addBoard,
  addBoardSuccess,
  deleteBoard,
  deleteBoardSuccess,
  loadBoards,
  loadBoardsSuccess,
  updateBoard,
  updateBoardSuccess,
} from './boards.actions';

describe('BoardsEffects', () => {
  const initialState = { boards: [] };
  const boardsService = jasmine.createSpyObj('boardsService', [
    'getBoards',
    'getBoard',
    'addBoard',
    'updateBoard',
    'deleteBoard',
  ]);
  let effects: BoardsEffects;
  let actions: Observable<any>;
  let store: MockStore<any>;
  let testScheduler: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BoardsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        { provide: BoardService, useValue: boardsService },
      ],
    }).compileComponents();

    effects = TestBed.inject(BoardsEffects);
    store = TestBed.inject(MockStore);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach(() => {
    effects = TestBed.inject(BoardsEffects);
    store = TestBed.inject(MockStore);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('loadBoards$', () => {
    it('should handle loadBoards and return a loadBoardsSuccess action', () => {
      const boards: any[] = [];
      const action = loadBoards({ id: '1' });
      const outcome = loadBoardsSuccess({ boards });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: boards });
        boardsService.getBoards.and.returnValue(response);

        helpers
          .expectObservable(effects.loadBoards$)
          .toBe('--b', { b: outcome });
      });
    });
  });

  describe('addBoard$', () => {
    it('should handle addBoard and return a addBoardSuccess action', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };
      const id = '1';
      const action = addBoard({ board });
      const outcome = addBoardSuccess({ id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: board.userID } });
        boardsService.addBoard.and.returnValue(response);

        helpers.expectObservable(effects.addBoard$).toBe('--b', { b: outcome });
      });
    });
  });

  describe('updateBoard$', () => {
    it('should handle updateBoard and return a updateBoardSuccess action', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };
      const id = '1';
      const action = updateBoard({ board });
      const outcome = updateBoardSuccess({ id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: board.userID } });
        boardsService.updateBoard.and.returnValue(response);

        helpers.expectObservable(effects.updateBoard$).toBe('--b', {
          b: outcome,
        });
      });
    });
  });

  describe('deleteBoard$', () => {
    it('should handle deleteBoard and return a deleteBoardSuccess action', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };
      const id = '1';
      const action = deleteBoard({ board });
      const outcome = deleteBoardSuccess({ id });

      testScheduler.run((helpers: any) => {
        actions = helpers.hot('-a', { a: action });
        const response = helpers.cold('-b|', { b: { id: board.userID } });
        boardsService.deleteBoard.and.returnValue(response);

        helpers.expectObservable(effects.deleteBoard$).toBe('--b', {
          b: outcome,
        });
      });
    });
  });
});
