import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { UuidUtil } from '../../common/utils/uuid.util';

// Mover esse tipo para um arquivo especifico
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
    this.validateId(id);

    const { deletedCount } = await this.articlesRepository.removeById(id);

    this.validateDeletion(deletedCount);

    return { message: `Artigo (id: ${id}) deletado com sucesso!` };
  }

  private validateDeletion(deletedCount: number) {
    if (this.deleteSuccessfully(deletedCount)) {
      throw new NotFoundException('Erro ao deletar o artigo da base de dados.');
    }
  }

  private deleteSuccessfully(deletedCount: number) {
    return deletedCount != 1;
  }

  // Está havendo duplicação deste código em mais de um service, criar uma classe especifica para isso e
  // reusar-la em todos os services que precisem deste tipo de chegagem
  private validateId(id: string): void {
    if (!this.uuidUtil.validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
