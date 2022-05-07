import { CreateArticleDto } from '../dtos/create-article.dto';

export interface ISpaceFlightNewsProvider {
  // Acredito que o nome CreateArticleDto ficou ruim para ser utilizado neste context
  // Pois passa a ideia de criação quando aqui está sendo feito apenas um acesso
  // Eu utilizaria aqui o tipo ArticleDto mesmo q ele fosse igual, no momento, a CreateArticleDto
  findArticles(limit?: number, sortBy?: string): Promise<CreateArticleDto[]>;
  findArticlesCount(): Promise<number>;
}
