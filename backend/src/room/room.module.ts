import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomValidationService } from './validation/validateRoomField.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService, RoomValidationService],
  exports: [RoomService],
})
export class RoomModule {}
