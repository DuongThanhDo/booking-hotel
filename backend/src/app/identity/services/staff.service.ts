import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity, UserEntity } from '../entities';
import { Role } from 'src/common/constants/enum';
import { UpdateStaffDto } from '../dtos/updates/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<UserEntity[] | null> {
    const users = await this.userService.findAll();
    const staffs = users.filter((user) => user.role === Role.staff);

    return staffs;
  }

  async findById(id: string): Promise<StaffEntity | null> {
    const staff = await this.staffRepository.findOne({
      where: { staff_id: id },
      relations: ['user'],
    });

    if (!staff) return null;

    return staff;
  }

  async update(
    id: string,
    updateStaffDto: UpdateStaffDto,
  ): Promise<UserEntity | null> {
    const { position } = updateStaffDto;
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!user) return null;

    const staff = await this.staffRepository.findOne({
      where: { user },
    });

    if (staff) {
      await this.staffRepository.update(staff.staff_id, { position: position });
      return this.userService.findById(id);
    } else {
      const newStaff = new StaffEntity();
      newStaff.position = position;
      newStaff.user = user;

      this.staffRepository.save(newStaff);
      return this.userService.findById(id);
    }
  }
}
