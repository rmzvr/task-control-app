import { BoardsState } from './boards';
import { CommentsState } from './comments';
import { ListsState } from './lists';
import { ModalsState } from './modals';
import { TasksState } from './tasks';
import { ToolbarState } from './toolbar';
import { UserState } from './user';

export interface State {
  boards: BoardsState;
  modals: ModalsState;
  toolbar: ToolbarState;
  lists: ListsState;
  tasks: TasksState;
  comments: CommentsState;
  user: UserState;
}
