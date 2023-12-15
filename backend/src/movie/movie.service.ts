import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieValidationService } from './validation/validateMovieField.service';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private movieValidationService: MovieValidationService
  ) { }

  async create(createMovieDto: CreateMovieDto) {
    try {
      const result = await this.movieValidationService.execute(createMovieDto);

      if (typeof result === 'string') {
        return { message: result };
      }

      if (result.error) {
        return { error: result.error };
      }

      return { movie: result, message: 'Filme criado com sucesso' };
    } catch (error) {
      return { error: 'Erro interno ao criar o filme' };
    }
}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto,
    });
  }

  async remove(id: number) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}
