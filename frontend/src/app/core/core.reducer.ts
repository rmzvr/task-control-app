import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import { boardsReducer } from './states/boards';
import { commentsReducer } from './states/comments';
import { listsReducer } from './states/lists';
import { modalsReducer } from './states/modals';
import { tasksReducer } from './states/tasks';
import { toolbarReducer } from './states/toolbar';
import { userReducer } from './states/user';

export const reducers: ActionReducerMap<State> = {
  boards: boardsReducer,
  lists: listsReducer,
  modals: modalsReducer,
  toolbar: toolbarReducer,
  tasks: tasksReducer,
  comments: commentsReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = [];
