import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { Booking } from '../bookings/booking.entity';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Booking])],
  providers: [PackagesService],
  controllers: [PackagesController],
})
export class PackagesModule {}
