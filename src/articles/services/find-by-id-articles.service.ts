import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UuidUtil } from '../../common/utils/uuid.util';

@Injectable()
export class FindByIdArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(id: string): Promise<ArticleDocument> {
    this.isValidateId(id);

    const article = await this.articlesRepository.findById(id);

    if (!article) {
      throw new NotFoundException('Artigo não encontrado na base de dados.');
    }

    return article;
  }

  private isValidateId(id: string): void {
    if (!this.uuidUtil.validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
