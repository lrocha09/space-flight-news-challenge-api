import { Module } from '@nestjs/common';
import { CreateArticlesService } from './services/create-articles.service';
import { FindArticlesService } from './services/find-articles.service';
import { FindArticleByIdService } from './services/find-article-by-id.service';
import { UpdateArticleByIdService } from './services/update-article-by-id.service';
import { RemoveArticleByIdService } from './services/remove-article-by-id.service';
import { ArticlesRepository } from './repositories/articles.repository';
import { ArticlesController } from './controllers/articles.controller';
import { Article, ArticleSchema } from './schemas/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceFlightNewsProvider } from './providers/space-flight-news.provider';
import { BullModule } from '@nestjs/bull';
import { SynchronizeArticlesService } from './services/synchronize-articles.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    BullModule.registerQueue({
      name: 'synchronizeArticles',
    }),
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesRepository,
    SpaceFlightNewsProvider,
    CreateArticlesService,
    FindArticlesService,
    FindArticleByIdService,
    UpdateArticleByIdService,
    RemoveArticleByIdService,
    SynchronizeArticlesService,
  ],
  exports: [ArticlesRepository],
})
export class ArticlesModule {}
