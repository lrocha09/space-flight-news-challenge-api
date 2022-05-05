import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleResponseDto } from '../../swagger/dtos/article-response-model.dto';
import { ErrorMessageResponseDto } from '../../swagger/dtos/error-message-response-model.dto';

export function ApiPostArticles() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar novo artigo.',
      description: '',
    }),
    ApiResponse({
      status: 201,
      description: 'Artigo criado com sucesso.',
      type: ArticleResponseDto,
    }),
    ApiResponse({
      status: 400,
      description:
        'Erro de sintaxe, por exemplo, quando um campo obrigatório não é especificado.',
      type: ErrorMessageResponseDto,
    }),
  );
}
