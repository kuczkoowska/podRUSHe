import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UseGuards, Logger } from '@nestjs/common';
import { WsAuthGuard } from '../auth/guards/ws-auth.guard';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  private logger = new Logger(ChatGateway.name);

  constructor(private readonly chatService: ChatService) { }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() messageData: { receiverId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.user.id;
    const receiverId = senderId === 9 ? messageData.receiverId : 9;

    this.logger.log(`User ${senderId} is trying to send a message to ${receiverId}`);

    const message = await this.chatService.sendMessage(senderId, receiverId, messageData.content);

    this.server.to(`user-${receiverId}`).emit('receiveMessage', message);
    this.logger.log(`Message sent to user-${receiverId}`);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { userId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.user.id;
    const messages = await this.chatService.getMessages(userId);
    client.emit('receiveMessages', messages);
  }
}
