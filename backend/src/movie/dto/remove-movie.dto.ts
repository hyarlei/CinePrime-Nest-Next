import { Prisma } from "@prisma/client";

export class RemoveMovieDto implements Prisma.UserWhereInput {
    id: number;
}