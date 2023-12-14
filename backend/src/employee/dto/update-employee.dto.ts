import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employeedto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
