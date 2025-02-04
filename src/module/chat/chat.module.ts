import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat.entity';
import { ChatController } from './chat.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([ChatMessage]), UsersModule],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, JwtService],
})
export class ChatModule {}