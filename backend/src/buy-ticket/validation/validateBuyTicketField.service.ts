import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TicketValidationService {
    private readonly FULL_PRICE = 21.00;
    private readonly HALF_PRICE = 11.20;

    constructor(private prisma: PrismaService) {}
}
