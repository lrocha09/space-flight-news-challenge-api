import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UniqueIdentifier } from '../../common/utils/unique-identifier.util';

@Injectable()
export class FindArticleByIdService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uniqueIdentifier: UniqueIdentifier,
  ) {}

  async execute(id: string): Promise<ArticleDocument> {
    this.uniqueIdentifier.validate(id);

    const article = await this.articlesRepository.findById(id);

    this.validateArticle(article);

    return article;
  }

  private validateArticle(article: ArticleDocument) {
    if (!article) {
      throw new NotFoundException('Artigo não encontrado na base de dados.');
    }

    return article;
  }
}
