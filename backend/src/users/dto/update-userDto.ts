import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-userDto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
