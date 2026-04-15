export const SocketEvents = {
  AUTHENTICATE: 'socket.authenticate',
  JOIN_CONVERSATION: 'conversation.join',
  LEAVE_CONVERSATION: 'conversation.leave',
  TYPING: 'conversation.typing',
  READ_RECEIPT: 'conversation.read_receipt',
  NOTIFICATION: 'notification.created',
  PRESENCE_UPDATE: 'presence.update',
} as const;
