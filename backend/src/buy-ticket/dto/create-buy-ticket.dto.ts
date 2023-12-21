import { Prisma } from "@prisma/client";

export class CreateBuyTicketDto implements Prisma.TicketCreateInput{
    idUser: number;
    idSession: number;
    type: string;
    price: number;
    session: Prisma.SessionCreateNestedOneWithoutTicketsInput;
    user: Prisma.UserCreateNestedOneWithoutTicketsInput;
}
