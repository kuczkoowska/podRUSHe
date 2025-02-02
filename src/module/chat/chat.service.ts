import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveMessage(senderId: number, receiverId: number, content: string) {
    const sender = await this.userRepository.findOne({ where: { id: senderId } });
    const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) throw new Error('User not found');

    const message = this.chatRepository.create({ sender, receiver, content });
    return this.chatRepository.save(message);
  }

  async getChatHistory(userId: number, adminId: number) {
    return this.chatRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: adminId } },
        { sender: { id: adminId }, receiver: { id: userId } },
      ],
      order: { timestamp: 'ASC' },
    });
  }

    async saveOfflineMessage(senderId: number, receiverId: number, content: string) {
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

        if (!sender || !receiver) throw new Error('User not found');

        const message = this.chatRepository.create({ sender, receiver, content, isDelivered: false });
        return this.chatRepository.save(message);
    }

    async markMessageAsDelivered(messageId: number) {
        const message = await this.chatRepository.findOne({ where: { id: messageId } });

        if (!message) throw new Error('Message not found');

        message.isDelivered = true;
        return this.chatRepository.save(message);
    }

    async getMessages(userId: number) {
        return this.chatRepository.find({
          where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
          order: { timestamp: 'DESC' },
        });
      }
}

