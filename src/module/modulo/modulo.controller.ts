import {
  Body,
  Post,
  Get,
  Put,
  Controller,
  Param,
} from '@nestjs/common';
import { ModuloDTO } from './modulo.dto';
import { ModuloService } from './modulo.service';

@Controller('modulo')
export class ModuloController {
  constructor(private readonly moduloService: ModuloService) {}

  @Post() // rota post
  async create(@Body() data: ModuloDTO) {
    return this.moduloService.create(data);
  }

  @Get() // rota get para buscar todos os módulos
  async findAll() {
    return this.moduloService.findAll();
  }

  @Get('unico/:id') // rota get para buscar um único módulo
  async findOne(@Param('id') id: string){
    return this.moduloService.findOne(id);
  }

  @Get('total/') // rota get para calcular o total de módulos
  async totalModulos(){
    return this.moduloService.totalModulos();
  }

  @Get('aluno/:id')
  async findModulesForOneStudent(@Param('id') id: string){
    return this.moduloService.findModulesForOneStudent(id);
  }

  // localhost:3000/1 = 1 é o id precisa de um nome
  @Put(':id') // rota put
  async update(@Param('id') id: string, @Body() data: ModuloDTO) {
    return this.moduloService.update(id, data);
  }

}
