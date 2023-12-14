import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmployeeDto } from './dto/create-employeedto';
import { FindAllEmployeeDto } from './dto/findAll-employeeDto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeValidationService } from './validation/validateEmployee.service';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private employeeValidationService: EmployeeValidationService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const validationError = await this.employeeValidationService.validateUserFields(createEmployeeDto);

    if(validationError) {
      return { error: validationError };
    }

    try {
      const createdEmployee = await this.employeeValidationService.execute(createEmployeeDto);

      return { employee: createdEmployee };
    } catch (error) {
      return { error: 'Erro interno ao criar o funcionário' };
    }
  }

  async findAll(findEmployeeDto: FindAllEmployeeDto) {
    return this.prisma.user.findMany(findEmployeeDto);
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
