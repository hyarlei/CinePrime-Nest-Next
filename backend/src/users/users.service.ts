import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersValidationService } from './validation/validateUserFields.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private usersValidationService: UsersValidationService,
    ) {}

  async create(createUserDto: CreateUserDto) {
    const validationError = await this.usersValidationService.validateUserFields(createUserDto);

    if (validationError) {
      return { error: validationError };
    }

    try {
      const createdUser = await this.usersValidationService.execute(createUserDto);

      return { user: createdUser };
    } catch (error) {
      return { error: 'Erro interno ao criar o usuário' };
    }
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
