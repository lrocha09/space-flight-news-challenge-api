import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { UuidUtil } from '../../common/utils/uuid.util';

type RemoveResult = {
  message: string;
};

@Injectable()
export class RemoveByIdArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uuidUtil: UuidUtil,
  ) {}

  async execute(id: string): Promise<RemoveResult> {
    this.isValidateId(id);

    const { deletedCount } = await this.articlesRepository.removeById(id);

    if (deletedCount != 1) {
      throw new NotFoundException('Erro ao deletar o artigo da base de dados.');
    }

    return { message: `Artigo (id: ${id}) deletado com sucesso!` };
  }

  private isValidateId(id: string): void {
    if (!this.uuidUtil.validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
