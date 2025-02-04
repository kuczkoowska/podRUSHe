import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "./booking.entity";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { Package } from "../packages/package.entity";
import { BookingUpdateDto } from "./dto/update-booking.dto";

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
    const totalPrice = packageItem.price * numberOfTravelers;

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
  
    const booking = this.bookingsRepository.create({
      user,
      package: packageItem,
      bookingDate: new Date(),
      totalPrice,
      numberOfTravelers,
    });
  
    return this.bookingsRepository.save(booking);
  }

  async getBookings(userId: number): Promise<Booking[]> {
    return this.bookingsRepository.find({ where: { user: { id: userId } }, relations: ['package'], select: ['id', 'bookingDate', 'numberOfTravelers', 'totalPrice', 'package'] });
  }


  async cancelBooking(id: number, userId?: number): Promise<void> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: ['user']
    });
  
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
  
    if (userId && booking.user.id !== userId) {
      throw new UnauthorizedException('You can only cancel your own bookings');
    }
  
    await this.bookingsRepository.delete(id);
  }
  
  async updateBooking(id: number, updates: Partial<BookingUpdateDto>, userId: number): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['package'],
    });

    console.log(booking);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (new Date(booking.package.startDate) < new Date()) {
      throw new BadRequestException('Cannot modify a past booking');
    }

    if (updates.numberOfTravelers && updates.numberOfTravelers > 0) {
      booking.numberOfTravelers = updates.numberOfTravelers;
      booking.totalPrice = booking.package.price * updates.numberOfTravelers;
    }

    return this.bookingsRepository.save(booking);
  }
}
