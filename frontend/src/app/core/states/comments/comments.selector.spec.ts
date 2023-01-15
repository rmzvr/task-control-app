import { selectCurrentComment, selectTaskComments } from './comments.selector';

describe('commentsSelectors', () => {
  const comment = {
    _id: '1',
    name: 'Comment',
    taskID: '1',
    boardID: '1',
    created_date: new Date().toDateString(),
  };

  it('should select all comments', () => {
    const comments = [comment, comment];

    const result = selectTaskComments.projector({ comments });

    expect(result.length).toBe(2);
    expect(result[1]._id).toBe('1');
  });
  it('should select editable board', () => {
    const result = selectCurrentComment.projector({ currentComment: comment });

    expect(result).toEqual(comment);
  });
});
