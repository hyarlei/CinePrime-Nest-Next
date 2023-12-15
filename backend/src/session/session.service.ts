import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ValidateSessionService } from './validation/validateSession.service';

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private validateSessionService: ValidateSessionService,
    ) { }

  async create(createSessionDto: CreateSessionDto) {
    try {
      const result = await this.validateSessionService.execute(createSessionDto);

      if (typeof result === 'string') {
        return { message: result };
      }

      if (result.error) {
        return { error: result.error };
      }

      return { session: result, message: 'Sessão criada com sucesso' };
    } catch (error) {
      return { error: 'Erro interno ao criar a sessão' };
    }
  }

  async findAll() {
    return this.prisma.session.findMany();
  }

  async findOne(id: number) {
    return this.prisma.session.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    return this.prisma.session.update({
      where: { id },
      data: updateSessionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.session.delete({
      where: { id },
    });
  }
}
