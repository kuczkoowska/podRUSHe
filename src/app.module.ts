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

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jagoda',
      password: 'jagoda',
      database: 'podrushe',
      entities: [User, Package, Booking],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
    PackagesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
