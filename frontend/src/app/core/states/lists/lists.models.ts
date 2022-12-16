export interface List {
  _id: string;
  name: string;
  boardID: string;
  background: string;
  tasks: Task[];
  isArchive?: boolean;
}

export interface ListsState {
  lists: List[];
  error: string | null;
  status: string;
}
