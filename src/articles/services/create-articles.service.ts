import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';
import { UuidUtil } from '../../common/utils/uuid.util';

@Injectable()
export class CreateArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    // Como está sendo aplicada inversão de controle para que o código do dominio não dependa de lib externa, acredito
    // que este nome não precise ficar associado ao nome da lib. Eu colocaria um nome com mais significado semântico para
    // o domínio, por exemplo: UniqueIdentifier
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    const articleDtoTransformed = this.transformBody(createArticleDto);

    return this.articlesRepository.create(articleDtoTransformed);
  }

  // Eu ateraria o nome desse método, ele está muito genérico e não representa a ação sendo feita
  // Minha sugestão aqui seria: enrichArticleWithUniqueId
  private transformBody(createArticleDto: CreateArticleDto): CreateArticleDto {
    createArticleDto.id = this.uuidUtil.generate();

    return createArticleDto;
  }
}
