import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleResponseDto } from '../../swagger/dtos/article-response-model.dto';
import { ErrorMessageResponseDto } from '../../swagger/dtos/error-message-response-model.dto';

export function ApiPutArticles() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar artigo por id.' }),
    ApiResponse({ status: 200, description: 'OK.' }),
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
