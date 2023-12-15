import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateSessionDto } from '../dto/create-session.dto';

@Injectable()
export class ValidateSessionService {
  constructor(private readonly prisma: PrismaService,
    ) {}

  async validateSession(session: CreateSessionDto): Promise<string> | null {
    const { dateTime, exibitionType, dublingType, atualTicketsQtd, maxTicketsQtd } = session;
    if (!dateTime || !exibitionType || !dublingType || atualTicketsQtd === undefined || maxTicketsQtd === undefined) {
        return 'Preencha todos os campos';
    }
    if (atualTicketsQtd > maxTicketsQtd) {
        return 'A quantidade de ingressos atual não pode ser maior que a quantidade máxima de ingressos';
        }

        return null;
    }

    async execute(session: CreateSessionDto) {
        const validationError = await this.validateSession(session);

        if (validationError) {
            return { error: validationError };
        }

        try {
            await this.prisma.session.create({
                data: session,
            })

            return 'Sessão criada com sucesso!';
        } catch (error) {
            return { error: error.message };
        }
    }
}
