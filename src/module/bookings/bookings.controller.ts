import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.entity";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Request() req, @Body() body: CreateBookingDto ): Promise<Booking> {
    console.log(req.user);
    console.log(body);
    console.log(req.user.userId);
    const userId = req.user.userId;
    return this.bookingsService.createBooking(userId, body.packageId, body.numberOfTravelers);
  }

  @Roles('admin')
  @Get('user/:userId')
  getBookings(@Param('userId') userId: number): Promise<Booking[]> {
    return this.bookingsService.getBookings(userId);
  }

  @Get()
  getMyBookings(@Request() req): Promise<Booking[]> {
    const userId = req.user.userId;
    return this.bookingsService.getBookings(userId);
  }

  @Roles('admin')
  @Delete(':id')
  cancelBooking(@Param('id') id: number): Promise<void> {
    return this.bookingsService.cancelBooking(id);
  }

  @Delete('my/:id')
  cancelMyBooking(
    @Request() req,
    @Param('id') id: number
  ): Promise<void> {
    const userId = req.user.userId;
    return this.bookingsService.cancelBooking(id, userId);
  }


  @Put()
  updateBooking(@Param('id') id: number, @Body() updates: { numberOfTravelers?: number; bookingDate?: Date }): Promise<Booking> {
    return this.bookingsService.updateBooking(id, updates);
  }
}
