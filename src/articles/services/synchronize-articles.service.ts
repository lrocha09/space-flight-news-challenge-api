import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { SpaceFlightNewsProvider } from '../providers/space-flight-news.provider';
import { ArticlesRepository } from '../repositories/articles.repository';
import { UuidUtil } from '../../common/utils/uuid.util';

type ArticlesTransformed = CreateArticleDto & {
  externalId: number;
};

@Injectable()
export class SynchronizeArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly spaceFlightNewsProvider: SpaceFlightNewsProvider,
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(): Promise<void> {
    const extenalArticlesCount = await this.getExternalArticlesCount();

    const extenalArticles = await this.getExternalArticles(
      extenalArticlesCount,
    );

    await this.addAllExternalArticles(extenalArticles);
  }

  private async getExternalArticles(
    limit: number,
  ): Promise<CreateArticleDto[]> {
    return this.spaceFlightNewsProvider.findArticles(limit, 'id');
  }

  private async getExternalArticlesCount(): Promise<number> {
    return this.spaceFlightNewsProvider.findArticlesCount();
  }

  private async addAllExternalArticles(
    articles: CreateArticleDto[],
  ): Promise<void> {
    articles.forEach(async (item) => {
      const itemTransformed = this.transformExternalArticlesBody(item);

      const isArticle = await this.checkArticleExists(item.id);

      if (!isArticle) {
        await this.articlesRepository.create(itemTransformed);
      }
    });
  }

  private transformExternalArticlesBody(
    articles: CreateArticleDto,
  ): ArticlesTransformed {
    return {
      ...articles,
      externalId: +articles.id,
      id: this.uuidUtil.generate(),
    };
  }

  private async checkArticleExists(externalId: string): Promise<boolean> {
    const article = await this.articlesRepository.findByExternalId(externalId);

    return article ? true : false;
  }
}