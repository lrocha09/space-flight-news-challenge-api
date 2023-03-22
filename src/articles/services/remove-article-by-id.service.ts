import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { UniqueIdentifier } from '../../common/utils/unique-identifier.util';
import { RemoveResult } from '../../common/interfaces/remove-response.interface';
@Injectable()
export class RemoveArticleByIdService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly uniqueIdentifier: UniqueIdentifier,
  ) {}

  async execute(id: string): Promise<RemoveResult> {
    this.uniqueIdentifier.validate(id);

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
}
