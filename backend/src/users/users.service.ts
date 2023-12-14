import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-userDto';
import { FindAllUserDto } from './dto/findAll-userDto';
import { UpdateUserDto } from './dto/update-userDto';
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

      return { user: createdUser, MessageChannel: 'Usuário criado com sucesso' };
    } catch (error) {
      return { error: 'Erro interno ao criar o usuário' };
    }
  }

  async findAll(findUserDto: FindAllUserDto) {
    return this.prisma.user.findMany(findUserDto);
  }

  async findOne(emailOrId: string | number ) {
    if (typeof emailOrId === 'number') {
      // Lógica para buscar por id
      return this.prisma.user.findUnique({
        where: { id: emailOrId },
        });
    } else if (typeof emailOrId === 'string') {
      // Lógica para buscar por email
      return this.prisma.user.findUnique({
        where: { email: emailOrId },
        });
    } else {
      throw new Error('Tipo de parâmetro inválido');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      });
  }
}
