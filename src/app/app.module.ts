import { Module, InternalServerErrorException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ArticlesModule } from '../articles/articles.module';
import { SeedsModule } from '../seeds/seeds.module';
import { JobsModule } from '../jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { CommonModule } from '../common/common.module';
import { SwaggerModule } from '../swagger/swagger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST');
        const port = +configService.get<string>('REDIS_PORT');
        const password = configService.get<string>('REDIS_PASS');

        return {
          redis: {
            host,
            port,
            password,
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DB_URL');

        if (!uri)
          throw new InternalServerErrorException(
            'A URL de conexão com o banco de dados não foi configurada.',
          );

        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    CommonModule,
    ArticlesModule,
    SeedsModule,
    JobsModule,
    SwaggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
