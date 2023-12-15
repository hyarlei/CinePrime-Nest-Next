import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomValidationService } from './validation/validateRoomField.service';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private roomValidationService: RoomValidationService,
    ) { }

  async create(createRoomDto: CreateRoomDto) {
    try {
      const result = await this.roomValidationService.execute(createRoomDto);

      if (typeof result === 'string') {
        return { message: result };
      }

      if (result.error) {
        return { error: result.error };
      }

      return { room: result, message: 'Sala criada com sucesso' };
    } catch (error) {
      return { error: 'Erro interno ao criar a sala' };
    }
  }

  async findAll() {
    return this.prisma.room.findMany();
  }

  async findOne(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: number) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}
