import { Prisma } from "@prisma/client";

export class FindAllEmployeeDto implements Prisma.UserFindManyArgs {
    select?: Prisma.UserSelect;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    skip?: number;
    take?: number;
}