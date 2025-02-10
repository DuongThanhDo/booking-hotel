import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExistingUserDto } from '../../dtos/existing-user.dto';
import { AuthService } from 'src/app/auth/auth.service';
import { StaffService } from '../../services';
import { UpdateStaffDto } from '../../dtos/updates/update-staff.dto';

@Controller('staffs')
export class StaffController {
  constructor(
    private readonly authService: AuthService,
    private readonly staffService: StaffService,
  ) {}

  @Post('login')
  login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.staffService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }
}
