import { $Enums, Prisma } from "@prisma/client";

export class CreateEmployeeDto implements Prisma.UserCreateInput {
    nome?: string;
    cpf: string;
    telefone?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    profile?: $Enums.ProfileType;
    tickets?: Prisma.TicketCreateNestedManyWithoutUserInput;
}
