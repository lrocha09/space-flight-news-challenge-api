import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
