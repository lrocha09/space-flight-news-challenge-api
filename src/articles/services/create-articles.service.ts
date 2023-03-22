import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UniqueIdentifier } from '../../common/utils/unique-identifier.util';

@Injectable()
export class CreateArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uniqueIdentifier: UniqueIdentifier,
  ) {}

  async execute(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const article = this.enrichArticleWithUniqueId(createArticleDto);

    return this.articlesRepository.create(article);
  }

  private enrichArticleWithUniqueId(
    createArticleDto: CreateArticleDto,
  ): CreateArticleDto {
    createArticleDto.id = this.uniqueIdentifier.generate();

    return createArticleDto;
  }
}
