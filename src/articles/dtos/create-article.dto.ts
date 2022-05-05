import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateEventDto } from './create-event-article.dto';
import { CreateLauncheDto } from './create-launche-article.dto';

export class CreateArticleDto {
  id: string;

  externalId: number;

  @ApiProperty()
  @IsNotEmpty()
  featured: boolean;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  newsSite: string;

  @ApiProperty({ required: false })
  summary: string;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  publishedAt: Date;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  updatedAt: Date;

  @ApiProperty({ type: [CreateLauncheDto] })
  @ValidateNested()
  @Type(() => CreateLauncheDto)
  launches: CreateLauncheDto[];

  @ApiProperty({ type: [CreateEventDto] })
  @ValidateNested()
  @Type(() => CreateEventDto)
  events: CreateEventDto[];
}
