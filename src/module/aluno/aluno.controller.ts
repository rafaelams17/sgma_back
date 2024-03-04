import {
  Body,
  Post,
  Get,
  Put,
  Delete,
  Controller,
  Param,
} from '@nestjs/common';
import { AlunoDTO } from './aluno.dto';
import { AlunoService } from './aluno.service';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  // alunos
  @Post() 
  async create(@Body() data: AlunoDTO) {
    return this.alunoService.create(data);
  }

  @Get() 
  async findAll() {
    return this.alunoService.findAll();
  }
  // alunos/busca-um/id
  @Get('busca-um/:id')
  async findOne(@Param('id') id: string){
    return this.alunoService.findOne(id);
  }

  @Get('total/')
  async totalAlunos(){
    return this.alunoService.totalAlunos();
  }

  // localhost:3000/1 = 1 é o id precisa de um nome
  @Put(':id') // rota put
  async update(@Param('id') id: string, @Body() data: AlunoDTO) {
    return this.alunoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.alunoService.delete(id);
  }
}
