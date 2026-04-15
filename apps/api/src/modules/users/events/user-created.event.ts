export interface UserCreatedEvent {
  name: 'user.created';
  payload: {
    user_id: string;
    email: string;
    role: string;
    occurred_at: string;
  };
}
