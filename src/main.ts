import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionsFilter } from './common/errors/http-exception.filter';
import { SeedsService } from './seeds/services/seeds.service';
import { SwaggerSetupService } from './swagger/services/swagger-setup.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionsFilter());

  const configService = app.get(ConfigService) as ConfigService<any>;

  await app
    .get<SwaggerSetupService>(SwaggerSetupService)
    .setup(app, configService);
  await app.get<SeedsService>(SeedsService).start();

  const serverPort = configService.get('SERVER_PORT');
  if (!serverPort) throw new Error('A porta da aplicação não foi configurada.');

  await app.listen(serverPort);
}
bootstrap();
