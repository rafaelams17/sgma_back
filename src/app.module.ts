import { Module } from '@nestjs/common';
import { AlunoModule } from './module/aluno/aluno.module';
import { ModuloModule } from './module/modulo/modulo.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [AlunoModule, ModuloModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
