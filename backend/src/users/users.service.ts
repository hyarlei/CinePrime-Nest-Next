import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/findAll-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prisma.user.create({
      data: createUserDto,
      });
  }

  findAll(findUserDto: FindAllUserDto) {
    return this.prisma.user.findMany(findUserDto);
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      });
  }
}
