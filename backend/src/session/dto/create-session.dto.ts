import { Prisma } from "@prisma/client";

export class CreateSessionDto implements Prisma.SessionCreateInput{
    dateTime: string | Date;
    exibitionType: string;
    dublingType: string;
    atualTicketsQtd: number;
    maxTicketsQtd: number;
    tickets?: Prisma.TicketCreateNestedManyWithoutSessionInput;
    room: Prisma.RoomCreateNestedOneWithoutSessionsInput;
    movie: Prisma.MovieCreateNestedOneWithoutSessionsInput;
}
