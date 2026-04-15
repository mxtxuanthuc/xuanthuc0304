export interface AuthLoggedInEvent {
  name: 'auth.logged_in';
  payload: {
    user_id: string;
    session_id: string;
    occurred_at: string;
  };
}
