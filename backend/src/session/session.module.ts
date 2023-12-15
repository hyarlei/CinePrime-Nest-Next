import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { ValidateSessionService } from './validation/validateSession.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaService, ValidateSessionService],
  exports: [SessionService],
})
export class SessionModule {}
