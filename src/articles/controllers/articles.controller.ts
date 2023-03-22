import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateArticlesService } from '../services/create-articles.service';
import { FindArticlesService } from '../services/find-articles.service';
import { FindArticleByIdService } from '../services/find-article-by-id.service';
import { UpdateArticleByIdService } from '../services/update-article-by-id.service';
import { RemoveArticleByIdService } from '../services/remove-article-by-id.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPostArticles } from '../../swagger/decorators/api-post-articles.decorator';
import { ApiGetArticles } from '../../swagger/decorators/api-get-articles.decorator';
import { ApiGetArticleById } from '../../swagger/decorators/api-get-article-by-id.decorator';
import { ApiPutArticles } from '../../swagger/decorators/api-put-articles.decorator';
import { ApiDeleteArticles } from '../../swagger/decorators/api-delete-articles.decorator';
import { ArticleDocument } from '../schemas/article.schema';
import { RemoveResult } from '../../common/interfaces/remove-response.interface';
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly createArticlesService: CreateArticlesService,
    private readonly findArticlesService: FindArticlesService,
    private readonly findArticleByIdService: FindArticleByIdService,
    private readonly updateArticleByIdService: UpdateArticleByIdService,
    private readonly removeArticleByIdService: RemoveArticleByIdService,
  ) {}

  @Post()
  @ApiPostArticles()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleDocument> {
    return this.createArticlesService.execute(createArticleDto);
  }

  @Get()
  @ApiGetArticles()
  @ApiQuery({ name: 'page', required: false, description: 'Default: 0' })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Default: 5' })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ArticleDocument[]> {
    return this.findArticlesService.execute(page, pageSize);
  }

  @Get(':id')
  @ApiGetArticleById()
  async findById(@Param('id') id: string): Promise<ArticleDocument> {
    return this.findArticleByIdService.execute(id);
  }

  @Put(':id')
  @ApiPutArticles()
  async updateById(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument> {
    return this.updateArticleByIdService.execute(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiDeleteArticles()
  async removeById(@Param('id') id: string): Promise<RemoveResult> {
    return this.removeArticleByIdService.execute(id);
  }
}
