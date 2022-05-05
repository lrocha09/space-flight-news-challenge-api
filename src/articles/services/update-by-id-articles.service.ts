import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UuidUtil } from '../../common/utils/uuid.util';

@Injectable()
export class UpdateByIdArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument> {
    this.isValidateId(id);

    const updatedArticle = await this.articlesRepository.updateById(
      id,
      updateArticleDto,
    );

    if (!updatedArticle) {
      throw new NotFoundException('Artigo não encontrado na base de dados.');
    }

    return updatedArticle;
  }

  private isValidateId(id: string): void {
    if (!this.uuidUtil.validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
