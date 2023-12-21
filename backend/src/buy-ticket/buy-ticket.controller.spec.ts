import { Test, TestingModule } from '@nestjs/testing';
import { BuyTicketController } from './buy-ticket.controller';
import { BuyTicketService } from './buy-ticket.service';

describe('BuyTicketController', () => {
  let controller: BuyTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyTicketController],
      providers: [BuyTicketService],
    }).compile();

    controller = module.get<BuyTicketController>(BuyTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
