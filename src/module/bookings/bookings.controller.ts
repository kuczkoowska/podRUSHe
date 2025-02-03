import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.entity";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() body: { userId: number; packageId: number; numberOfTravelers: number }): Promise<Booking> {
    return this.bookingsService.createBooking(body.userId, body.packageId, body.numberOfTravelers);
  }

  @Get('user/:userId')
  getBookings(@Param('userId') userId: number): Promise<Booking[]> {
    return this.bookingsService.getBookings(userId);
  }

  @Delete(':id')
  cancelBooking(@Param('id') id: number): Promise<void> {
    return this.bookingsService.cancelBooking(id);
  }

  @Put(':id')
  updateBooking(@Param('id') id: number, @Body() updates: { numberOfTravelers?: number; bookingDate?: Date }): Promise<Booking> {
    return this.bookingsService.updateBooking(id, updates);
  }
}
