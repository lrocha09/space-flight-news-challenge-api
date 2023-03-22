import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class FindArticleDto extends PartialType(CreateArticleDto) {}
