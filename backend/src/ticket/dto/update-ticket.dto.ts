import { Prisma } from '@prisma/client';

export class UpdateTicketDto implements Prisma.TicketUpdateInput {
    idUser?: number;
    idSession?: number;
    type?: string;
    price?: number | Prisma.FloatFieldUpdateOperationsInput;
}