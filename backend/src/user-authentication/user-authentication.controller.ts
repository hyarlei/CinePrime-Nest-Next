import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { CreateUserAuthenticationDto } from './dto/create-user-authentication.dto';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';

@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(private readonly userAuthenticationService: UserAuthenticationService) {}

  @Post()
  create(@Body() createUserAuthenticationDto: CreateUserAuthenticationDto) {
    return this.userAuthenticationService.create(createUserAuthenticationDto);
  }

  @Get()
  findAll() {
    return this.userAuthenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAuthenticationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAuthenticationDto: UpdateUserAuthenticationDto) {
    return this.userAuthenticationService.update(+id, updateUserAuthenticationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAuthenticationService.remove(+id);
  }
}
