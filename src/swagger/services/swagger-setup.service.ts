import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerSetupService {
  async setup(
    app: INestApplication,
    configService: ConfigService<any>,
  ): Promise<void> {
    if (configService.get('APP_EXPOSE_DOCS') === 'true') {
      const config = new DocumentBuilder()
        .setTitle(configService.get('APP_NAME'))
        .setDescription(
          'Esta é uma documentação para a API: ' +
            configService.get('APP_NAME'),
        )
        .setVersion(configService.get('APP_VERSION'))
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(configService.get('APP_DOCS_PATH'), app, document);
    }
  }
}
