import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Injectable()
export class MovieValidationService {
    constructor(private prisma: PrismaService,
        ) {}

    async validateMovie(movie: CreateMovieDto): Promise<string | null> {
        const { name, genre, duration, classification, synopsis } = movie;

        if (!name || !genre || !duration || !classification || !synopsis) {
            return 'Preencha todos os campos';
        }

        if (!duration || isNaN(duration) || duration <= 0) {
            return 'Duração inválida';
        }

        if (!classification || (typeof classification !== 'string' && typeof classification !== 'number')) {
            return 'Classificação inválida';
        }

        if (!synopsis || synopsis.length < 10 || synopsis.length > 1000) {
            return 'Sinopse inválida';
        }

        if (!genre || typeof genre !== 'string') {
            return 'Gênero inválido';
        }

        const movieExists = await this.prisma.movie.findFirst({
            where: { name },
        });

        if (movieExists) {
            return 'Filme já cadastrado';
        }

        return null;
    }

    async execute(movie: CreateMovieDto) {
        const validationError = await this.validateMovie(movie);

        if (validationError) {
            return { error: validationError }
        }

        try {
            await this.prisma.movie.create({
                data: movie,
            });

            return 'Filme cadastrado com sucesso';
        } catch (error) {
            return { error: error.message}
        }
    }
}