import { Prisma } from "@prisma/client";

export class FindAllMovieDto implements Prisma.UserFindManyArgs {
    select?: Prisma.UserSelect;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    skip?: number;
    take?: number;
}