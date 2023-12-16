import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketValidationService } from './validation/validateTicketField.service';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService,
    private ticketValidationService: TicketValidationService,
    ) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const result = await this.ticketValidationService.execute(createTicketDto)

      if (typeof result === 'string') {
        return { message: result};
      }

      if (result.error) {
        return { error: result.error };
      }

      return { ticket: result, message: 'Ticket criado com sucesso!' };
    } catch (error) {
      return { error: 'Erro interno ao criar o ticket' };
    }
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto
    });
  }

  async remove(id: number) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
