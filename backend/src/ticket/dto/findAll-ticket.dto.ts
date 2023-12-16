import { Prisma } from "@prisma/client";

export class FindAllTicketDto implements Prisma.TicketFindManyArgs {
    select?: Prisma.TicketSelect;
    orderBy?: Prisma.RoomOrderByWithRelationInput;
    skip?: number;
    take?: number;
}