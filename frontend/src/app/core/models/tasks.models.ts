export interface Task {
  _id?: string;
  name: string;
  listID: string;
  boardID: string;
  description?: string;
  comments?: [];
  created_date?: string;
}

export interface TasksState {
  tasks: any[];
  currentTask: Task | null;
}
