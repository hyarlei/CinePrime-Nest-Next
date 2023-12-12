import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { MovieModule } from './movie/movie.module';
import { RoomModule } from './room/room.module';
import { SessionModule } from './session/session.module';
import { TicketModule } from './ticket/ticket.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, EmployeeModule, MovieModule, RoomModule, SessionModule, TicketModule, UserAuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
