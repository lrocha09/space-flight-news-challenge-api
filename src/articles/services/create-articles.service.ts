import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UuidUtil } from '../../common/utils/uuid.util';

@Injectable()
export class CreateArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const articleDtoTransformed = this.transformBody(createArticleDto);

    return this.articlesRepository.create(articleDtoTransformed);
  }

  private transformBody(createArticleDto: CreateArticleDto): CreateArticleDto {
    createArticleDto.id = this.uuidUtil.generate();

    return createArticleDto;
  }
}
