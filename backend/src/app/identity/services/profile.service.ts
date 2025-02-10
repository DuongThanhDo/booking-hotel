import { CreateProfileDto } from './../dtos/creates/create-profile.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity, UserEntity } from '../entities';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../dtos/updates/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    return this.profileRepository.save(createProfileDto);
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity | null> {
    const { name, phone, address } = updateProfileDto;
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!user) return null;

    const profile = await this.profileRepository.findOne({
      where: { user },
    });

    if (profile) {
      await this.profileRepository.update(profile.profile_id, updateProfileDto);
      return this.findById(profile.profile_id);
    } else {
      const newProfile = new ProfileEntity();
      newProfile.name = name;
      newProfile.phone = phone;
      newProfile.address = address;
      newProfile.user = user;

      this.profileRepository.save(newProfile);
      return this.findById(newProfile.profile_id);
    }
  }

  async findAll(): Promise<ProfileEntity[] | null> {
    return this.profileRepository.find({ relations: ['user'] });
  }

  async findById(id: string): Promise<ProfileEntity | null> {
    return this.profileRepository.findOne({
      where: { profile_id: id },
      relations: ['user'],
    });
  }
}
