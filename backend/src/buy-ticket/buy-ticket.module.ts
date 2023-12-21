import { Module } from '@nestjs/common';
import { BuyTicketService } from './buy-ticket.service';
import { BuyTicketController } from './buy-ticket.controller';

@Module({
  controllers: [BuyTicketController],
  providers: [BuyTicketService],
})
export class BuyTicketModule {}
