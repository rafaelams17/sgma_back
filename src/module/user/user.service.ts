import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // cria um usuario
  async create(data: UserDTO) {
    // verificar se o usuario já foi criado
    const userExists = await this.prisma.user.findFirst({
      // procure um modulo onde o nome é igual ao data.nome
      where: {
        usuario: data.usuario,
      },
    });

    // se caso o usuario exista vai lançar um exceção
    if (userExists) {
      throw new Error('Usuário já existe!');
    }

    // se o usuario não existir ele é salvo no banco

    // await é usado para aguardar a criação do usuario
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  // retornar todos os módulos disponíveis para a aplicação
  async findAll() {
    return this.prisma.user.findMany();
  }
}
