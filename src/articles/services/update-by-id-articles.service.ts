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
    this.validateId(id);

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

  // Mais uma vez duplicação do código. Digamos que eu precise mudar a mensagem ou o tipo de Exception estourada
  // Seria necessário alterar em 3 pontos, ou seja, acoplamento
  private validateId(id: string): void {
    if (!this.uuidUtil.validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
