import type { Socket } from 'socket.io';

export class ConversationRoomsService {
  joinConversationRoom(socket: Socket, conversationId: string) {
    socket.join(`conversation:${conversationId}`);
  }

  leaveConversationRoom(socket: Socket, conversationId: string) {
    socket.leave(`conversation:${conversationId}`);
  }
}
