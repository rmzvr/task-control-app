import { Board } from '.';
import {
  addBoard,
  addBoardFailed,
  addBoardSuccess,
  deleteBoard,
  deleteBoardFailed,
  deleteBoardSuccess,
  loadBoards,
  loadBoardsFailed,
  loadBoardsSuccess,
  setEditableBoard,
  updateBoard,
  updateBoardFailed,
  updateBoardSuccess,
} from './boards.actions';
import { boardsReducer } from './boards.reducer';
import { initialState } from './boards.state';

describe('boardsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'unknown',
      };

      const state = boardsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('addBoard action', () => {
    it('should add new board', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const action = addBoard({ board });

      const state = boardsReducer(initialState, action);

      expect(state.boards.length).toBe(1);
      expect(state.boards[0]).toEqual(board);
    });

    it('should change status to loading', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const action = addBoard({ board });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('loading');
    });
  });

  describe('addBoardSuccess action', () => {
    it('should change status to success', () => {
      const action = addBoardSuccess({ id: '1' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('success');
    });
  });

  describe('addBoardFailed action', () => {
    it('should change status to error', () => {
      const action = addBoardFailed({ error: 'error' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('error');
      expect(state.error).toBeTruthy();
    });
  });

  describe('updateBoard action', () => {
    it('should update exist board', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const updatedBoard = {
        _id: '1',
        name: 'Updated Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = updateBoard({ board: updatedBoard });

      const state = boardsReducer(initState, action);

      expect(state.boards[0].name).toBe(updatedBoard.name);
    });

    it("should not update doesn't exist board", () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const updatedBoard = {
        _id: '2',
        name: 'Updated Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = updateBoard({ board: updatedBoard });

      const state = boardsReducer(initState, action);

      expect(state.boards[0].name).toBe(initState.boards[0].name);
    });

    it('should change status to loading', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const updatedBoard = {
        _id: '1',
        name: 'Updated Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = updateBoard({ board: updatedBoard });

      const state = boardsReducer(initState, action);

      expect(state.status).toBe('loading');
    });
  });

  describe('updateBoardSuccess action', () => {
    it('should change status to success', () => {
      const action = updateBoardSuccess({ id: '1' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('success');
    });
  });

  describe('updateBoardFailed action', () => {
    it('should change status to error', () => {
      const action = updateBoardFailed({ error: 'error' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('error');
      expect(state.error).toBeTruthy();
    });
  });

  describe('deleteBoard action', () => {
    it('should delete exist board', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = deleteBoard({ board: board });

      const state = boardsReducer(initState, action);

      expect(state.boards.length).toBe(0);
    });

    it("should not delete doesn't exist board", () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const boardToDelete = {
        _id: '2',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = deleteBoard({ board: boardToDelete });

      const state = boardsReducer(initState, action);

      expect(state.boards.length).toBe(1);
    });

    it('should change status to loading', () => {
      const board = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const initState = {
        ...initialState,
        boards: [board],
      };

      const action = deleteBoard({ board: board });

      const state = boardsReducer(initState, action);

      expect(state.status).toBe('loading');
    });
  });

  describe('deleteBoardSuccess action', () => {
    it('should change status to success', () => {
      const action = deleteBoardSuccess({ id: '1' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('success');
    });
  });

  describe('deleteBoardFailed action', () => {
    it('should change status to error', () => {
      const action = deleteBoardFailed({ error: 'error' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('error');
      expect(state.error).toBeTruthy();
    });
  });

  describe('loadBoards action', () => {
    it('should change status to loading', () => {
      const action = loadBoards({ id: '1' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('loading');
    });
  });

  describe('loadBoardsSuccess action', () => {
    it('should update the boards state in an immutable way', () => {
      const newBoards = [
        {
          _id: '1',
          name: 'Board',
          userID: '1',
          description: 'Description',
          background: '#ffffff',
          created_date: '1',
        },
      ];

      const action = loadBoardsSuccess({ boards: newBoards });

      const state = boardsReducer(initialState, action);

      expect(state.boards).toEqual(newBoards);
      expect(state.boards).not.toBe(initialState.boards);
    });

    it('should change status to success', () => {
      const newBoards = [
        {
          _id: '1',
          name: 'Board',
          userID: '1',
          description: 'Description',
          background: '#ffffff',
          created_date: '1',
        },
      ];

      const action = loadBoardsSuccess({ boards: newBoards });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('success');
    });
  });

  describe('loadBoardsFailed action', () => {
    it('should change status to error', () => {
      const action = loadBoardsFailed({ error: 'error' });

      const state = boardsReducer(initialState, action);

      expect(state.status).toBe('error');
      expect(state.error).toBeTruthy();
    });
  });

  describe('setEditableBoard action', () => {
    it('should set editable board', () => {
      const editableBoard = {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      };

      const action = setEditableBoard({ board: editableBoard });

      const state = boardsReducer(initialState, action);

      expect(state.editableBoard).toBeTruthy();
    });
  });
});
