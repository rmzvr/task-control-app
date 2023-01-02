import { BoardsEffects } from './boards';
import { CommentsEffects } from './comments';
import { ListsEffects } from './lists';
import { TasksEffects } from './tasks';
import { UserEffects } from './user';

export const effects = [
  BoardsEffects,
  ListsEffects,
  TasksEffects,
  CommentsEffects,
  UserEffects,
];
