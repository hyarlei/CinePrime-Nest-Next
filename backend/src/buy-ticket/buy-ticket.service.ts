import { Injectable } from '@nestjs/common';
import { CreateBuyTicketDto } from './dto/create-buy-ticket.dto';
import { UpdateBuyTicketDto } from './dto/update-buy-ticket.dto';

@Injectable()
export class BuyTicketService {
  create(createBuyTicketDto: CreateBuyTicketDto) {
    return 'This action adds a new buyTicket';
  }

  findAll() {
    return `This action returns all buyTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyTicket`;
  }

  update(id: number, updateBuyTicketDto: UpdateBuyTicketDto) {
    return `This action updates a #${id} buyTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyTicket`;
  }
}
