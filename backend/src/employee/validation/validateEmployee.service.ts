import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmployeeDto } from '../dto/create-employeedto';

@Injectable()
export class EmployeeValidationService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async validateUserFields(user: CreateEmployeeDto): Promise<string | null> {
        const { nome, cpf, email, telefone, password } = user;
        const userCpf = user.cpf;

            const checkedAdmin = await this.prisma.user.findFirst({
                where: {
                    cpf: userCpf,
                    isAdmin: true,
                }
            })
            if (!checkedAdmin) { // Se o usuário que fez a requisição não for o Dono resultará em Sem autorização.
                return 'Sem autorização';
            }

            if (!nome || !cpf || !email || !telefone || !password) {
                return 'Preencha todos os campos';
            }

            const cpfRegex = /^\d{11}$/;
            if (!cpfRegex.test(cpf)) {
                return 'CPF inválido, preencha um CPF válido com 11 números, sem pontuações ou espaços';
            }

            const userExiste = await this.prisma.user.findFirst({
                where: {
                    cpf,
                },
            });

            if (userExiste) {
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

            const emailExiste = await this.prisma.user.findFirst({
                where: {
                    email,
                },
            });

            if (emailExiste) {
                return 'Email já existe';
            }

            return null;
        }

        async execute(user: CreateEmployeeDto) {
            const validationError = await this.validateUserFields(user);

            if (validationError) {
                return { error: validationError }
            }

            try {
                await this.prisma.user.create({
                    data: user,
                });

                return 'Usuário criado com sucesso!';
            } catch (error: any) {
                return { error: validationError };
            }
        }
    }