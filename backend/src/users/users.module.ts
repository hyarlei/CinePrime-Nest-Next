import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersValidationService } from './validation/validateUserFields.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersValidationService],
  exports: [UsersService],
})
export class UsersModule {}
