import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { SpaceFlightNewsProvider } from '../providers/space-flight-news.provider';
import { ArticlesRepository } from '../repositories/articles.repository';
import { UniqueIdentifier } from '../../common/utils/unique-identifier.util';
import { ArticleExternalDto } from '../dtos/article-external.dto';
@Injectable()
export class SynchronizeArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly spaceFlightNewsProvider: SpaceFlightNewsProvider,
    private readonly uniqueIdentifier: UniqueIdentifier,
  ) {}

  async execute(): Promise<void> {
    const extenalArticlesCount = await this.getExternalArticlesCount();

    const extenalArticles = await this.getExternalArticles(
      extenalArticlesCount,
    );

    await this.addExternalArticles(extenalArticles);
  }

  private async getExternalArticles(
    limit: number,
  ): Promise<CreateArticleDto[]> {
    return this.spaceFlightNewsProvider.findArticles(limit, 'id');
  }

  private async getExternalArticlesCount(): Promise<number> {
    return this.spaceFlightNewsProvider.findArticlesCount();
  }

  private async addExternalArticles(
    articles: CreateArticleDto[],
  ): Promise<void> {
    articles.forEach(async (item) => {
      const article = this.enrichArticleWithUniqueIds(item);

      const articleExists = await this.checkArticleExists(article.id);

      if (!articleExists) {
        await this.articlesRepository.create(article);
      }
    });
  }

  private enrichArticleWithUniqueIds(
    article: CreateArticleDto,
  ): ArticleExternalDto {
    return {
      ...article,
      externalId: Number(article.id),
      id: this.uniqueIdentifier.generate(),
    };
  }

  private async checkArticleExists(externalId: string): Promise<boolean> {
    const article = await this.articlesRepository.findByExternalId(externalId);

    return Boolean(article);
  }
}
