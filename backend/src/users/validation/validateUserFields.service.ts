import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersValidationService {
  constructor(
    private prisma: PrismaService,
  ) { }

  validateCpf(value: string): boolean {
    const cpfLimpo = value.replace(/[^\d]/g, '');

    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }

    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpfLimpo.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }

    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    return resto === parseInt(cpfLimpo.charAt(10));
  }

  async validateUserFields(user: CreateUserDto): Promise<string | null> {
    const { nome, cpf, email, telefone, password } = user;

    if (!nome || !cpf || !email || !telefone || !password) {
      return 'Preencha todos os campos';
    }

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf) || !this.validateCpf(cpf)) {
      return 'CPF inválido, preencha um CPF válido com 11 números, sem pontuações ou espaços';
    }

    const userExists = await this.prisma.user.findFirst({
      where: { cpf },
    });

    if (userExists) {
      return 'Usuário já existe';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Formato de email inválido, siga o formato user@mail.com';
    }

    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      return 'Formato de telefone inválido, siga exatamente o formato (85) 99292-9292';
    }

    const emailExists = await this.prisma.user.findFirst({
      where: { email },
    });

    if (emailExists) {
      return 'Email já existe';
    }

    return null;
  }

  async execute(user: CreateUserDto) {
    const validationError = await this.validateUserFields(user);

    if (validationError) {
      return { error: validationError }
    }

    try {
      const createdUser = await this.prisma.user.create({
        data: user,
      });

      if (user.cpf === process.env.CPF_CINEMA_OWNER) {
        await this.prisma.user.update({
          where: {
            id: createdUser.id,
          },
          data: {
            isAdmin: true,
            profile: 'employee',
          },
        });

        //tem algum return aqui? Não sei se é null
        return 'Usuário criado com sucesso!';
      }
    } catch (error: any) {
      return { error: validationError }
    }
  }
}