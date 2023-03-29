import { Module } from '@nestjs/common';
import { ModuloService } from './modulo.service';
import { ModuloController } from './modulo.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ModuloController],
  providers: [ModuloService, PrismaService],
})
export class ModuloModule {}
