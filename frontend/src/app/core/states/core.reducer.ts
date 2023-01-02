import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { boardsReducer } from './boards';
import { commentsReducer } from './comments';
import { State } from './core.state';
import { listsReducer } from './lists';
import { modalsReducer } from './modals';
import { tasksReducer } from './tasks';
import { toolbarReducer } from './toolbar';
import { userReducer } from './user';

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
