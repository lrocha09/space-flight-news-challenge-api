import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { SynchronizeArticlesProcessor } from './processors/synchronize-articles.processor';
import { SynchronizeArticlesService } from '../articles/services/synchronize-articles.service';
import { ArticlesRepository } from '../articles/repositories/articles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';
import { SpaceFlightNewsProvider } from '../articles/providers/space-flight-news.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    BullModule.registerQueue({
      name: 'synchronizeArticles',
    }),
  ],
  providers: [
    JobsService,
    SynchronizeArticlesProcessor,
    SpaceFlightNewsProvider,
    ArticlesRepository,
    SynchronizeArticlesService,
  ],
})
export class JobsModule {}
