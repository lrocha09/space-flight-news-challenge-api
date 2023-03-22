import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ArticleResponseDto } from '../dtos/article-response-model.dto';
import { ErrorMessageResponseDto } from '../dtos/error-message-response-model.dto';

export function ApiGetArticleById() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description:
        'Informar um id de um artigo existente no nosso banco de dados',
      type: String,
    }),
    ApiOperation({ summary: 'Buscar artigo por id.', description: '' }),
    ApiResponse({ status: 200, description: 'Ok.', type: ArticleResponseDto }),
    ApiResponse({
      status: 400,
      description:
        'Erro de identificador, por exemplo, quando o campo "id" informado é inválido.',
    }),
    ApiResponse({
      status: 404,
      description:
        'Erro Not Found, por exemplo, quando o campo "id" informado não pertence a nenhum artigo.',
      type: ErrorMessageResponseDto,
    }),
  );
}
