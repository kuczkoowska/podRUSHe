import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';
import { User } from '../users/user.entity';
import { CreateChatMessageDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  private logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getMessages(userId: number) {
    this.logger.log(`Fetching messages for user: ${userId}`);
    const messages = await this.chatRepository.find({ where: [{ senderId: userId }, { receiverId: userId }] });
    messages.forEach(message => {
      this.logger.log(`Message from ${message.senderId} to ${message.receiverId}: "${message.content}"`);
    });
    return messages;
  }

  async sendMessage(senderId: number, receiverId: number, content: string) {
    this.logger.log(`Message: ${senderId} -> ${receiverId}: "${content}"`);

    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      this.logger.warn(`User not found! sender: ${senderId}, receiver: ${receiverId}`);
      throw new Error('User not found');
      }

    const messageDto: CreateChatMessageDto = { senderId, receiverId, content };
    const message = this.chatRepository.create(messageDto);
    const savedMessage = await this.chatRepository.save(message);

    return savedMessage;
  }
}
