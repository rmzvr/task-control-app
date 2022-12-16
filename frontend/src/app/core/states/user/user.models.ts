export interface User {
  _id: string;
  username: string;
  password: string;
  created_date: string;
}

export interface UserState {
  user: User | null;
  error: string | null;
  status: string;
}
