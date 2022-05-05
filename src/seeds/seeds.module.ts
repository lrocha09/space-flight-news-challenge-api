import { Module } from '@nestjs/common';
import { SeedsService } from './services/seeds.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from '../articles/schemas/article.schema';
import { ArticlesModule } from '../articles/articles.module';
import { SynchronizeArticlesService } from '../articles/services/synchronize-articles.service';
import { SpaceFlightNewsProvider } from '../articles/providers/space-flight-news.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    ArticlesModule,
  ],
  providers: [
    SpaceFlightNewsProvider,
    SynchronizeArticlesService,
    SeedsService,
  ],
  exports: [SeedsService],
})
export class SeedsModule {}
