import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Patch } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.entity";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Roles } from "../auth/decorators/roles.decorator";
import { BookingUpdateDto } from "./dto/update-booking.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Create a new booking' })
  @Post()
  createBooking(@Request() req, @Body() body: CreateBookingDto ): Promise<Booking> {
    console.log(req.user);
    console.log(body);
    console.log(req.user.userId);
    const userId = req.user.userId;
    return this.bookingsService.createBooking(userId, body.packageId, body.numberOfTravelers);
  }

  @ApiOperation({ summary: 'Get bookings for a specific user' })
  @Roles('admin')
  @Get('user/:userId')
  getBookings(@Param('userId') userId: number): Promise<Booking[]> {
    return this.bookingsService.getBookings(userId);
  }

  @ApiOperation({ summary: 'Get bookings for the current user' })
  @Get()
  getMyBookings(@Request() req): Promise<Booking[]> {
    const userId = req.user.userId;
    return this.bookingsService.getBookings(userId);
  }

  @ApiOperation({ summary: 'Cancel a booking by ID' })
  @Roles('admin')
  @Delete(':id')
  cancelBooking(@Param('id') id: number): Promise<void> {
    return this.bookingsService.cancelBooking(id);
  }

  @ApiOperation({ summary: 'Cancel a booking for the current user' })
  @Delete('')
  cancelMyBooking(
    @Request() req,
    @Param('id') id: number
  ): Promise<void> {
    const userId = req.user.userId;
    return this.bookingsService.cancelBooking(id, userId);
  }

  @ApiBody({ type: BookingUpdateDto })
  @ApiOperation({ summary: 'Update a booking' })
  @Patch(':id')
  updateBooking(@Param('id') id: number,@Request() req, @Body() bookingData: Partial<BookingUpdateDto>): Promise<Booking> {
    return this.bookingsService.updateBooking(id, bookingData, req.user.userId);
  }
}
