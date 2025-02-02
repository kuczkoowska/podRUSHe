import { Controller, Get, Param, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateChatMessageDto } from './create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':adminId')
  getChat(@Request() req, @Param('adminId') adminId: string) {
  return this.chatService.getChatHistory(req.user.id, Number(adminId));
  }

  @Post('send')
    async sendMessage(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatService.saveMessage(
        createChatMessageDto.senderId,
        createChatMessageDto.receiverId,
        createChatMessageDto.content,
    );
    }

    @Get('messages/:userId')
    async getMessages(@Param('userId') userId: string) {
    return this.chatService.getMessages(Number(userId));
    }
}
