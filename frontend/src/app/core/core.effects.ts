import { BoardsEffects } from './states/boards';
import { CommentsEffects } from './states/comments';
import { ListsEffects } from './states/lists';
import { TasksEffects } from './states/tasks';
import { UserEffects } from './states/user';

export const effects = [
  BoardsEffects,
  ListsEffects,
  TasksEffects,
  CommentsEffects,
  UserEffects,
];
