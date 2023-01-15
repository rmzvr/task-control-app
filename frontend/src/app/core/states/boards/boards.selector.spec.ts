import { Board } from '.';
import {
  selectBoard,
  selectBoardItems,
  selectBoards,
  selectEditableBoard,
  selectError,
  selectStatus,
} from './boards.selector';

describe('boardsSelectors', () => {
  it('should select all boards', () => {
    const boards: Board[] = [
      {
        _id: '1',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      },
      {
        _id: '2',
        name: 'Board',
        userID: '1',
        description: 'Description',
        background: '#ffffff',
        created_date: '1',
      },
    ];

    const result = selectBoardItems.projector({ boards });

    expect(result.length).toBe(2);
    expect(result[1]._id).toBe('2');
  });

  it('should select editable board', () => {
    const board = {
      _id: '1',
      name: 'Board',
      userID: '1',
      description: 'Description',
      background: '#ffffff',
      created_date: '1',
    };

    const result = selectEditableBoard.projector({ editableBoard: board });

    expect(result).toEqual(board);
  });

  it('should select status', () => {
    const status = 'success';

    const result = selectStatus.projector({ status });

    expect(result).toEqual(status);
  });

  it('should select error', () => {
    const error = 'error';

    const result = selectError.projector({ error });

    expect(result).toEqual(error);
  });
});
