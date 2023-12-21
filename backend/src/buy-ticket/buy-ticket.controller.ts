import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyTicketService } from './buy-ticket.service';
import { CreateBuyTicketDto } from './dto/create-buy-ticket.dto';
import { UpdateBuyTicketDto } from './dto/update-buy-ticket.dto';

@Controller('buy-ticket')
export class BuyTicketController {
  constructor(private readonly buyTicketService: BuyTicketService) {}

  @Post()
  create(@Body() createBuyTicketDto: CreateBuyTicketDto) {
    return this.buyTicketService.create(createBuyTicketDto);
  }

  @Get()
  findAll() {
    return this.buyTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyTicketDto: UpdateBuyTicketDto) {
    return this.buyTicketService.update(+id, updateBuyTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyTicketService.remove(+id);
  }
}
