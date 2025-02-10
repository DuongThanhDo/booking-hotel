import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from '../../services';
import { CreateRoomDto } from '../../dtos/creates';
import { UpdateRoomDto } from '../../dtos/updates';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get('type')
  getTypeRoom() {
    return this.roomService.getNonRepeatRoomType();
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  finById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }
}
