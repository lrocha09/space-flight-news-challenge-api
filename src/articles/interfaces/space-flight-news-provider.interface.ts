import { CreateArticleDto } from '../dtos/create-article.dto';

export interface ISpaceFlightNewsProvider {
  findArticles(limit?: number, sortBy?: string): Promise<CreateArticleDto[]>;
  findArticlesCount(): Promise<number>;
}
