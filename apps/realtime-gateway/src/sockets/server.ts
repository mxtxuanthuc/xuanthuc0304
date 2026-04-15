import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PresenceService } from '../presence/presence.service';
import { ConversationRoomsService } from '../rooms/conversation-rooms.service';
import { SocketEvents } from '../events/socket-events';

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });
const presenceService = new PresenceService();
const roomsService = new ConversationRoomsService();

io.on('connection', (socket) => {
  socket.on(SocketEvents.AUTHENTICATE, ({ userId }: { userId: string }) => {
    socket.data.userId = userId;
    presenceService.markOnline(userId);
    io.emit(SocketEvents.PRESENCE_UPDATE, { userId, online: true });
  });

  socket.on(SocketEvents.JOIN_CONVERSATION, ({ conversationId }: { conversationId: string }) => {
    roomsService.joinConversationRoom(socket, conversationId);
  });

  socket.on(SocketEvents.LEAVE_CONVERSATION, ({ conversationId }: { conversationId: string }) => {
    roomsService.leaveConversationRoom(socket, conversationId);
  });

  socket.on('disconnect', () => {
    const userId = socket.data.userId as string | undefined;
    if (userId) {
      presenceService.markOffline(userId);
      io.emit(SocketEvents.PRESENCE_UPDATE, { userId, online: false });
    }
  });
});

httpServer.listen(8090);
