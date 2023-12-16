import { Prisma } from "@prisma/client";

export class RemoveEmployeeDto implements Prisma.UserWhereInput {
    id: number;
}