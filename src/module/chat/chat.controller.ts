import { Controller, Get, Param, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getChat(@Request() req) {
    return this.chatService.getMessages(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(@Request() req, @Body() dto: { receiverId: number; content: string }) {
    const senderId = req.user.id;
    const receiverId = dto.receiverId === 9 ? 9 : dto.receiverId;
    return this.chatService.sendMessage(senderId, receiverId, dto.content);
  }

  @Get('messages/:userId')
  async getMessages(@Param('userId') userId: string) {
    return this.chatService.getMessages(Number(userId));
  }
}
