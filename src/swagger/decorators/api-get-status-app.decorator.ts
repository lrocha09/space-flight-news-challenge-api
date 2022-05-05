import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageResponseDto } from '../dtos/message-response-model.dto';

export function ApiGetStatusApp() {
  return applyDecorators(
    ApiOperation({ summary: 'Obter mensagem de status da API.' }),
    ApiResponse({ status: 200, description: 'Ok.', type: MessageResponseDto }),
  );
}
