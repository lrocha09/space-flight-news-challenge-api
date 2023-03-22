import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

export class ArticleExternalDto extends CreateArticleDto {
  @ApiProperty()
  externalId: number;
}
