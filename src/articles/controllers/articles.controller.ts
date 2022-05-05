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
import { FindAllArticlesService } from '../services/find-all-articles.service';
import { FindByIdArticlesService } from '../services/find-by-id-articles.service';
import { UpdateByIdArticlesService } from '../services/update-by-id-articles.service';
import { RemoveByIdArticlesService } from '../services/remove-by-id-articles.service';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { UpdateArticleDto } from '../dtos/update-article.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiPostArticles } from '../../swagger/decorators/api-post-articles.decorator';
import { ApiGetAllArticles } from '../../swagger/decorators/api-get-all-articles.decorator';
import { ApiGetByIdArticles } from '../../swagger/decorators/api-get-by-id-articles.decorator';
import { ApiPutArticles } from '../../swagger/decorators/api-put-articles.decorator';
import { ApiDeleteArticles } from '../../swagger/decorators/api-delete-articles.decorator';
import { ArticleDocument } from '../schemas/article.schema';

type RemoveResult = {
  message: string;
};

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly createArticlesService: CreateArticlesService,
    private readonly findAllArticlesService: FindAllArticlesService,
    private readonly findByIdArticlesService: FindByIdArticlesService,
    private readonly updateByIdArticlesService: UpdateByIdArticlesService,
    private readonly removeByIdArticlesService: RemoveByIdArticlesService,
  ) {}

  @Post()
  @ApiPostArticles()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleDocument> {
    return this.createArticlesService.execute(createArticleDto);
  }

  @Get()
  @ApiGetAllArticles()
  @ApiQuery({ name: 'page', required: false, description: 'Default: 0' })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Default: 5' })
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ArticleDocument[]> {
    return this.findAllArticlesService.execute(+page, +pageSize);
  }

  @Get(':id')
  @ApiGetByIdArticles()
  async findById(@Param('id') id: string): Promise<ArticleDocument> {
    return this.findByIdArticlesService.execute(id);
  }

  @Put(':id')
  @ApiPutArticles()
  async updateById(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDocument> {
    return this.updateByIdArticlesService.execute(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiDeleteArticles()
  async removeById(@Param('id') id: string): Promise<RemoveResult> {
    return this.removeByIdArticlesService.execute(id);
  }
}
