import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AppCacheModule } from './cache/cache.module';
import { EmployeeModule } from './employee/employee.module';
import { MovieModule } from './movie/movie.module';
import { RoomModule } from './room/room.module';
import { SessionModule } from './session/session.module';
import { TicketModule } from './ticket/ticket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, EmployeeModule, MovieModule, RoomModule, SessionModule, TicketModule, AuthModule, AppCacheModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
