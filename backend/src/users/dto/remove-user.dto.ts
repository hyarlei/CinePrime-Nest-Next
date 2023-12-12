import { Prisma } from "@prisma/client";

export class RemoveUserDto implements Prisma.UserWhereInput {
    id: number;
}