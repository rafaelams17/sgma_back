import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../database/PrismaService";
import { AlunoDTO } from "./aluno.dto";

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  // cria um aluno
  async create(data: AlunoDTO) {
    // verificar se o aluno já foi criado
    const alunoExists = await this.prisma.aluno.findFirst({
      // procure um aluno onde o cpf é igual ao data.cpf
      where: {
        cpf: data.cpf,
      },
    });

    // se caso o aluno exista vai lançar um exceção
    if (alunoExists) {
      throw new Error("Aluno já existe!");
    }

    // se o aluno não existir ele é salvo no banco

    // await é usado para aguardar a criação do aluno
    const aluno = await this.prisma.aluno.create({
      data,
    });
    return aluno;
  }

  // retornar todos os alunos disponíveis para a aplicação
  async findAll() {
    return this.prisma.aluno.findMany();
  }

  async findOne(id: string) {
    return this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });
  }

  async totalAlunos() {
    // somar a quantidade de alunos cadastrados
    return this.prisma.aluno.count();
  }

  // atualizar um aluno
  async update(id: string, data: AlunoDTO) {
    const alunoExists = await this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    // se aluno não existir ele deve lançar uma exceção
    if (!alunoExists) {
      throw new Error("Aluno não existe!");
    }

    return await this.prisma.aluno.update({
      data,
      where: {
        id,
      },
    });
  }

  // deletar um aluno
  async delete(id: string) {
    const alunoExists = await this.prisma.aluno.findUnique({
      where: {
        id,
      },
    });

    // se livro não existir ele deve lançar uma exceção
    if (!alunoExists) {
      throw new Error("Aluno não existe!");
    }

    await this.prisma.modulo.deleteMany({
      where: {
        id_aluno: id,
      },
    });

    return await this.prisma.aluno.delete({
      where: {
        id,
      },
    });
  }
}
