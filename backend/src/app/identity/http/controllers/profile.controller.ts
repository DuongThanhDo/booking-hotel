import { UpdateProfileDto } from '../../dtos/updates/update-profile.dto';
import { ProfileService } from './../../services/profile.service';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}
