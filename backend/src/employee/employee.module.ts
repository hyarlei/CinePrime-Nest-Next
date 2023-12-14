import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeValidationService } from './validation/validateEmployee.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, EmployeeValidationService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
