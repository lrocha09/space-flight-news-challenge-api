import { Module } from '@nestjs/common';
import { CreateArticlesService } from './services/create-articles.service';
import { FindAllArticlesService } from './services/find-all-articles.service';
import { FindByIdArticlesService } from './services/find-by-id-articles.service';
import { UpdateByIdArticlesService } from './services/update-by-id-articles.service';
import { RemoveByIdArticlesService } from './services/remove-by-id-articles.service';
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
    FindAllArticlesService,
    FindByIdArticlesService,
    UpdateByIdArticlesService,
    RemoveByIdArticlesService,
    SynchronizeArticlesService,
  ],
  exports: [ArticlesRepository],
})
export class ArticlesModule {}
