import { Injectable } from '@nestjs/common';
import { CreateUserAuthenticationDto } from './dto/create-user-authentication.dto';
import { UpdateUserAuthenticationDto } from './dto/update-user-authentication.dto';

@Injectable()
export class UserAuthenticationService {
  create(createUserAuthenticationDto: CreateUserAuthenticationDto) {
    return 'This action adds a new userAuthentication';
  }

  findAll() {
    return `This action returns all userAuthentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAuthentication`;
  }

  update(id: number, updateUserAuthenticationDto: UpdateUserAuthenticationDto) {
    return `This action updates a #${id} userAuthentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAuthentication`;
  }
}
