import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
  import { UseGuards } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private readonly chatService: ChatService) {}
  
    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() messageData: { senderId: number; receiverId: number; content: string },
      @ConnectedSocket() client: Socket,
    ) {
      const message = await this.chatService.saveMessage(
        messageData.senderId,
        messageData.receiverId,
        messageData.content,
      );
  
    const receiverSocket = this.server.sockets.sockets.get(`user-${messageData.receiverId}`);
    if (receiverSocket) {
      receiverSocket.emit('receiveMessage', message);
    } else {
      await this.chatService.saveOfflineMessage(messageData.senderId, messageData.receiverId, messageData.content);
    }
      this.server.to(`user-${messageData.receiverId}`).emit('receiveMessage', message);
  
      return message;
    }
  
    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('joinChat')
    handleJoinChat(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
      client.join(`user-${userId}`);
    }
  }
  