export type User = {
  email: string;
  password?: string;
  name?: string;
  surname?: string;
  username?: string;
};

export type Notification = {
  type: 'success' | 'error' | 'warning';
  data: string;
};
