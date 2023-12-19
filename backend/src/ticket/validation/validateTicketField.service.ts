import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';

@Injectable()
export class TicketValidationService {
    private readonly FULL_PRICE = 21.00;
    private readonly HALF_PRICE = 11.20;

    constructor(private prisma: PrismaService) {}

    async validateTicketField(ticket: CreateTicketDto): Promise<string | null> {
        const { idUser, idSession, type } = ticket;

        if (!idUser || !idSession || !type) {
            return 'Preencha todos os campos';
        }

        const [sessionExists, userExists] = await Promise.all([
            this.prisma.session.findUnique({
                where: { id: idSession },
            }),
            this.prisma.user.findUnique({
                where: { id: idUser },
            }),
        ]);

        if (!sessionExists) {
            return 'Sessão não existe';
        }

        if (!userExists) {
            return 'Usuário não existe';
        }

        if (sessionExists.atualTicketsQtd === sessionExists.maxTicketsQtd) {
            return 'Sessão lotada';
        }

        return null;
    }

    async execute(ticket: CreateTicketDto) {
        const { idSession, idUser, type } = ticket;
        const validationError = await this.validateTicketField(ticket);

        if (validationError) {
            return { error: validationError };
        }

        try {
            const ticketType = type === 'Meia' ? 'Meia' : 'Inteira';
            const ticketPrice = type === 'Meia' ? this.HALF_PRICE : this.FULL_PRICE;

            const createdTicket = await this.prisma.ticket.create({
                data: {
                    idUser,
                    idSession,
                    type: ticketType,
                    price: ticketPrice,
                },
            });

            await Promise.all([
                this.prisma.session.findUnique({
                    where: { id: idSession },
                }),
            ]);

            await this.prisma.session.update({
                where: { id: idSession },
                data: {
                    atualTicketsQtd: {
                        increment: 1,
                    },
                },
            });

            await this.prisma.user.update({
                where: { id: idUser },
                data: {
                    tickets: {
                        connect: { id: createdTicket.id },
                    },
                },
            });

            return 'Ticket criado com sucesso!';
        } catch (error) {
            return { error: error.message };
        }
    }
}
