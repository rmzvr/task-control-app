export interface Comment {
  _id?: string;
  name: string;
  taskID?: string;
  boardID?: string;
  created_date?: string;
}

export interface CommentsState {
  comments: Comment[];
  currentComment: Comment | null;
}
