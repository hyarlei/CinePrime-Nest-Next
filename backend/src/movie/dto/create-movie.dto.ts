import { Prisma } from "@prisma/client";

export class CreateMovieDto implements Prisma.MovieCreateInput {
    name: string;
    genre: string;
    duration: number;
    classification: string;
    synopsis: string;
    sessions?: Prisma.SessionCreateNestedManyWithoutMovieInput;
}
