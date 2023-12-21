import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyTicketDto } from './create-buy-ticket.dto';

export class UpdateBuyTicketDto extends PartialType(CreateBuyTicketDto) {}
