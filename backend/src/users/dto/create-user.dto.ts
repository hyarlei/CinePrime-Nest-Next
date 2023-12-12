import { $Enums, Prisma } from "@prisma/client";

export class CreateUserDto implements Prisma.UserCreateInput {
    nome?: string;
    cpf: string;
    telefone?: string;
    isAdmin?: boolean;
    profile?: $Enums.ProfileType;
    tickets?: Prisma.TicketCreateNestedManyWithoutUserInput;
    email: string;
    password: string;
}
