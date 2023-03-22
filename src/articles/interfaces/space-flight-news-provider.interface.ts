import { FindArticleDto } from '../dtos/find-article.dto';
export interface ISpaceFlightNewsProvider {
  findArticles(limit?: number, sortBy?: string): Promise<FindArticleDto[]>;
  findArticlesCount(): Promise<number>;
}
