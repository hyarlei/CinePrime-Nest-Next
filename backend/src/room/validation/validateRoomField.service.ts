import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';

@Injectable()
export class RoomValidationService {
    constructor(private prisma: PrismaService,
    ) { }

    async validateRoomField(room: CreateRoomDto): Promise<string | null> {
        const { qtd_max, typeExhibitionAccepted } = room;

        if (!qtd_max || !typeExhibitionAccepted) {
            return 'Preencha todos os campos';
        }

        return null;
    }

    async execute(room: CreateRoomDto) {
        const validationError = await this.validateRoomField(room);

        if (validationError) {
            return { error: validationError };
        }

        try {
            await this.prisma.room.create({
                data: room,
            })

            return 'Sala criada com sucesso!';
        } catch (error) {
            return { error: error.message };
        }
    }
}