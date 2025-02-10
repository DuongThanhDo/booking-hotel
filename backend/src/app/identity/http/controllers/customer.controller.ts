import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../services';
import { ExistingUserDto } from '../../dtos/existing-user.dto';
import { AuthService } from 'src/app/auth/auth.service';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() existingUserDto: ExistingUserDto) {
    return this.authService.login(existingUserDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.customerService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dob: Date) {
    return this.customerService.update(id, dob);
  }
}
