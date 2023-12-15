import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieValidationService } from './validation/validateMovieField.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, PrismaService, MovieValidationService],
  exports: [MovieService],
})
export class MovieModule {}
