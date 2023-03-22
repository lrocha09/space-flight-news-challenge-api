import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UniqueIdentifier } from '../../common/utils/unique-identifier.util';

@Injectable()
export class UpdateArticleByIdService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uniqueIdentifier: UniqueIdentifier,
  ) {}

  async execute(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument> {
    this.uniqueIdentifier.validate(id);

    const updatedArticle = await this.articlesRepository.updateById(
      id,
      updateArticleDto,
    );

    this.validateArticleUpdate(updatedArticle);

    return updatedArticle;
  }

  private validateArticleUpdate(updatedArticle: ArticleDocument) {
    if (!updatedArticle) {
      throw new NotFoundException('Artigo não encontrado na base de dados.');
    }
  }
}
