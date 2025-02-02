import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from './module/users/user.entity';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import * as dotenv from 'dotenv';
import { Package } from './module/packages/package.entity';
import { PackagesModule } from './module/packages/packages.module';
import { Booking } from './module/bookings/booking.entity';
import { BookingsModule } from './module/bookings/bookings.module';
import { Comment } from './module/comments/comment.entity';
import { CommentsModule } from './module/comments/comments.module';
import { ChatMessage } from './module/chat/chat.entity';
import { ChatModule } from './module/chat/chat.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'podrushe',
      entities: [User, Package, Booking, Comment, ChatMessage],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    CommentsModule,
    AuthModule,
    PackagesModule,
    BookingsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
