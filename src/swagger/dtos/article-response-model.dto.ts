import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDto } from 'src/articles/dtos/create-article.dto';

export class ArticleResponseDto extends CreateArticleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  externalId: number;
}
