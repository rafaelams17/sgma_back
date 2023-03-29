import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { ModuloDTO } from "./modulo.dto";

@Injectable()
export class ModuloService {
  constructor(private prisma: PrismaService) {}

  // cria um módulo
  async create(data: ModuloDTO) {
    // verificar se o módulo já foi criado
    const moduloExists = await this.prisma.modulo.findFirst({
      // procure um modulo onde o nome é igual ao nome que está no bd
      where: {
        nome: data.nome,
      },
    });

    // se caso o módulo exista vai lançar um exceção
    if (moduloExists) {
      throw new Error("Módulo já existe!");
    }

    // se o módulo não existir ele é salvo no banco

    // await é usado para aguardar a criação do módulo
    const modulo = await this.prisma.modulo.create({
      data,
    });
    return modulo;
  }

  // retornar todos os módulos disponíveis para a aplicação
  async findAll() {
    return this.prisma.modulo.findMany();
  }

  async findOne(id: string) {
    return this.prisma.modulo.findUnique({
      where: {
        id,
      },
    });
  }

  async findModulesForOneStudent(id: string) {
    return this.prisma.modulo.findMany({
      where: {
        id_aluno: id,
      }
    })
  }

  async totalModulos() {
    // somar a quantidade de módulos cadastrados
    return this.prisma.modulo.count();
  }

  // atualizar um módulo
  async update(id: string, data: ModuloDTO) {
    const moduloExists = await this.prisma.modulo.findUnique({
      where: {
        id,
      },
    });

    // se módulo não existir ele deve lançar uma exceção
    if (!moduloExists) {
      throw new Error("Módulo não existe!");
    }

    return await this.prisma.modulo.update({
      data,
      where: {
        id,
      },
    });
  }
}
