import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketValidationService } from './validation/validateTicketField.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService, PrismaService, TicketValidationService],
  exports: [TicketService],
})
export class TicketModule {}
