import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat.entity';
import { ChatController } from './chat.controller';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([ChatMessage]), UsersModule],
    controllers: [ChatController],
    providers: [ChatService, ChatGateway],
})
export class ChatModule {}