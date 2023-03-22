import { Injectable } from '@nestjs/common';
import { ArticlesRepository } from '../repositories/articles.repository';
import { ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class FindArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute(page: number, pageSize: number): Promise<ArticleDocument[]> {
    return this.articlesRepository.findAll(page || 0, pageSize || 5);
  }
}
