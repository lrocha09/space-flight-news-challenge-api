import { CreateArticleDto } from '../dtos/create-article.dto';
import { ISpaceFlightNewsProvider } from '../interfaces/space-flight-news-provider.interface';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosRequestsProvider } from '../../common/providers/axios-requests.provider';

@Injectable()
export class SpaceFlightNewsProvider implements ISpaceFlightNewsProvider {
  constructor(private readonly axiosRequestsProvider: AxiosRequestsProvider) {}

  async findArticlesCount(): Promise<number> {
    try {
      const { data: artitclesCount } = await this.axiosRequestsProvider.get(
        this.getArticlesCountUrl(),
        {
          accept: 'application/json',
        },
      );

      return artitclesCount;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findArticles(
    limit?: number,
    sortBy?: string,
  ): Promise<CreateArticleDto[]> {
    const params = this.getFindArticlesParams(limit, sortBy);

    try {
      const { data: articles } = await this.axiosRequestsProvider.get(
        this.getArticlesBaseUrl(),
        {
          accept: 'application/json',
        },
        params,
      );

      return articles;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any): void {
    const { statusCode, message } = error.response.data;

    if (statusCode == HttpStatus.BAD_REQUEST)
      throw new BadRequestException(message);
    if (statusCode == HttpStatus.FORBIDDEN)
      throw new ForbiddenException(message);
    if (statusCode == HttpStatus.NOT_FOUND)
      throw new NotFoundException(message);
    throw new UnprocessableEntityException(message);
  }

  private getArticlesCountUrl(): string {
    return `${this.getArticlesBaseUrl()}/count`;
  }

  private getArticlesBaseUrl(): string {
    return `${process.env.BASE_URL_SPACEFLIGHT}/articles`;
  }

  private getFindArticlesParams(limit?: number, sortBy?: string) {
    const filterLimit = limit && {
      _limit: limit,
    };

    const filterSortBy = sortBy && {
      _sort: sortBy,
    };

    const params = {
      ...filterLimit,
      ...filterSortBy,
    };

    return params;
  }
}
