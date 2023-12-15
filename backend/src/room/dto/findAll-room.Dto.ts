import { Prisma } from "@prisma/client";

export class FindAllRoomDto implements Prisma.RoomFindManyArgs {
    select?: Prisma.RoomSelect;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput;
    skip?: number;
    take?: number;
}