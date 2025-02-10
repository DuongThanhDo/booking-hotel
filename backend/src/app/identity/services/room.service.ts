import { CreateRoomDto } from './../dtos/creates/create-room.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entities';
import { Repository } from 'typeorm';
import { UpdateRoomDto } from '../dtos/updates/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomRepository.save(createRoomDto);
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  async findById(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({
      where: { room_id: id },
    });
  }

  async getNonRepeatRoomType(): Promise<RoomEntity[]> {
    const rooms = await this.findAll();
    const seen = new Set();

    return rooms.reduce((acc, room) => {
      if (!seen.has(room.type)) {
        seen.add(room.type);
        acc.push(room);
      }
      return acc;
    }, []);
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomEntity | null> {
    const room = await this.findById(id);
    if (!room) return null;

    await this.roomRepository.update(id, updateRoomDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const room = await this.findById(id);
    if (!room) return false;

    this.roomRepository.delete(id);
    return true;
  }
}
