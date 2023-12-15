import { Prisma } from "@prisma/client";

export class CreateRoomDto implements Prisma.RoomCreateInput{
    qtd_max: number;
    typeExhibitionAccepted: string;
    sessions?: Prisma.SessionCreateNestedManyWithoutRoomInput;
}
