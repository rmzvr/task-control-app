import { BoardsState } from './states/boards';
import { CommentsState } from './states/comments';
import { ListsState } from './states/lists';
import { ModalsState } from './states/modals';
import { TasksState } from './states/tasks';
import { ToolbarState } from './states/toolbar';
import { UserState } from './states/user';

export interface State {
  boards: BoardsState;
  modals: ModalsState;
  toolbar: ToolbarState;
  lists: ListsState;
  tasks: TasksState;
  comments: CommentsState;
  user: UserState;
}
