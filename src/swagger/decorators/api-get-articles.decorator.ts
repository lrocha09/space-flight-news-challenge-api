import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleResponseDto } from '../dtos/article-response-model.dto';

export function ApiGetArticles() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar artigos.', description: '' }),
    ApiResponse({
      status: 200,
      description: 'Ok.',
      type: [ArticleResponseDto],
    }),
  );
}
