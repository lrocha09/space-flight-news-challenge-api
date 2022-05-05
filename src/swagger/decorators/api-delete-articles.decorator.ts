import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorMessageResponseDto } from '../../swagger/dtos/error-message-response-model.dto';
import { MessageResponseDto } from '../dtos/message-response-model.dto';

export function ApiDeleteArticles() {
  return applyDecorators(
    ApiOperation({ summary: 'Remover artigo por id.' }),
    ApiResponse({
      status: 200,
      description: 'Ok.',
      type: MessageResponseDto,
    }),
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
