import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { User } from '../users/user.entity';
import { Package } from '../packages/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,
    User,
    Package
])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}