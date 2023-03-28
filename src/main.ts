import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // liberar acesso externo para api
  await app.listen(3000); // a porta do navegador que está disponível para testes
}
bootstrap();
