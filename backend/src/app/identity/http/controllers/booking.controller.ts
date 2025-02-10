import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from '../../services';
import { CreateBookingDto } from '../../dtos/creates';
import { UpdateBookingDto } from '../../dtos/updates';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  create(
    @Body()
    body: {
      createBookingDto: CreateBookingDto;
      customer_id: string;
      rooms_id: [room_id: string];
    },
  ) {
    return this.bookingService.create(body);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  finById(@Param('id') id: string) {
    return this.bookingService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
