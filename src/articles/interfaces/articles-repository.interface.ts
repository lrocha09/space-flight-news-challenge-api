import { ArticleDocument } from '../schemas/article.schema';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { IRemoveResponse } from '../../common/interfaces/remove-response.interface';

export interface IArticlesRepository {
  create(createArticleDto: CreateArticleDto): Promise<ArticleDocument>;
  findAll(fields?: string): Promise<ArticleDocument[]>;
  findById(id: string): Promise<ArticleDocument | null>;
  updateById(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument | null>;
  removeById(id: string): Promise<IRemoveResponse>;
  removeAll(): Promise<void>;
}
