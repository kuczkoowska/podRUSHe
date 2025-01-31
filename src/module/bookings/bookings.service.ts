import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { Package } from "../packages/package.entity";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}



  async createBooking(userId: number, packageId: number, numberOfTravelers: number): Promise<Booking> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const packageItem = await this.packagesRepository.findOne({ where: { id: packageId } });
    const existingBooking = await this.bookingsRepository.findOne({
        where: { user: { id: userId }, package: { id: packageId } }
      });
    
    if (existingBooking) {
    throw new BadRequestException('You already booked this package. Modify your existing booking instead.');
    }
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (!packageItem) {
      throw new NotFoundException('Package not found');
    }
  
    if (numberOfTravelers < 1) {
      throw new BadRequestException('Number of travelers must be at least 1');
    }
  
    const booking = new Booking();
    booking.user = user;
    booking.package = packageItem;
    booking.bookingDate = new Date();
    booking.numberOfTravelers = numberOfTravelers;
    booking.totalPrice = packageItem.price * numberOfTravelers;
  
    return this.bookingsRepository.save(booking);
  }

  async getBookings(userId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({ where: { user: { id: userId } } });
  }


  async cancelBooking(id: number): Promise<void> {
    return this.bookingsRepository.delete(id).then(() => undefined);
  }
  
  async updateBooking(id: number, updates: { numberOfTravelers?: number; bookingDate?: Date }): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ where: { id }, relations: ['package'] });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (new Date(booking.bookingDate) < new Date()) {
      throw new BadRequestException('Cannot modify a past booking');
    }

    if (updates.numberOfTravelers && updates.numberOfTravelers > 0) {
      booking.numberOfTravelers = updates.numberOfTravelers;
      booking.totalPrice = booking.package.price * updates.numberOfTravelers;
    }

    if (updates.bookingDate) {
      booking.bookingDate = updates.bookingDate;
    }

    return this.bookingsRepository.save(booking);
  }
}
