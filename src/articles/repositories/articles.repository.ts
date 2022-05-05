import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { IRemoveResponse } from '../../common/interfaces/remove-response.interface';
import { Article, ArticleDocument } from '../schemas/article.schema';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly articlesModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    return new this.articlesModel(createArticleDto).save();
  }

  async findAll(
    page?: number,
    pageSize?: number,
    sortBy?: string,
  ): Promise<ArticleDocument[]> {
    return this.articlesModel
      .find()
      .sort(sortBy)
      .skip(page * pageSize)
      .limit(pageSize)
      .exec();
  }

  async findById(id: string): Promise<ArticleDocument | null> {
    return this.articlesModel.findOne({ id }).exec();
  }

  async findByExternalId(externalId: string): Promise<ArticleDocument | null> {
    return this.articlesModel.findOne({ externalId }).exec();
  }

  async updateById(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument | null> {
    return this.articlesModel
      .findOneAndUpdate(
        { id },
        { $set: updateArticleDto },
        { new: true, useFindAndModify: false },
      )
      .exec();
  }

  async removeById(id: string): Promise<IRemoveResponse> {
    return this.articlesModel
      .deleteOne({
        id,
      })
      .exec();
  }

  async removeAll(): Promise<void> {
    await this.articlesModel.deleteMany({}).exec();
  }
}
