import { CreateUserDto } from './../dtos/creates/user-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomerEntity,
  ProfileEntity,
  StaffEntity,
  UserEntity,
} from '../entities';
import { Repository } from 'typeorm';
import { Role } from 'src/common/constants/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      relations: ['customer', 'staff', 'profile'],
    });

    return users;
  }

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { user_id: id },
      relations: ['customer', 'staff', 'profile'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email: email },
      relations: ['customer', 'staff', 'profile'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const {
        user_name,
        password,
        email,
        dob,
        position,
        role,
        name,
        phone,
        address,
      } = createUserDto;

      const newUser = await this.userRepository.save({
        user_name,
        password,
        email,
        role,
      });

      if (role === Role.staff) {
        await this.staffRepository.save({
          position: position || '',
          user: newUser,
        });
      } else {
        await this.customerRepository.save({
          dob: dob || new Date('1900-01-01'),
          user: newUser,
        });
      }

      await this.profileRepository.save({
        name,
        phone,
        address,
        user: newUser,
      });

      return newUser;
    } catch (error) {
      new Error(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['customer', 'staff', 'profile'],
    });

    if (!user) return false;

    if (user.customer) {
      await this.customerRepository.delete(user.customer.customer_id);
    }
    if (user.staff) {
      await this.staffRepository.delete(user.staff.staff_id);
    }
    if (user.profile) {
      await this.profileRepository.delete(user.profile.profile_id);
    }

    await this.userRepository.delete(id);
    return true;
  }
}
