import { CreateArticleDto } from '../dtos/create-article.dto';
import { ISpaceFlightNewsProvider } from '../interfaces/space-flight-news-provider.interface';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AxiosRequestsProvider } from '../../common/providers/axios-requests.provider';

@Injectable()
export class SpaceFlightNewsProvider implements ISpaceFlightNewsProvider {
  constructor(private readonly axiosRequestsProvider: AxiosRequestsProvider) {}

  async findArticlesCount(): Promise<number> {
    const result = this.axiosRequestsProvider
      .get(`${process.env.BASE_URL_SPACEFLIGHT}/articles/count`, {
        accept: 'application/json',
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.handleErrors(error);
      });

    return await result;
  }

  async findArticles(
    limit?: number,
    sortBy?: string,
  ): Promise<CreateArticleDto[]> {
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

    const result = this.axiosRequestsProvider
      .get(
        `${process.env.BASE_URL_SPACEFLIGHT}/articles`,
        {
          accept: 'application/json',
        },
        params,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        this.handleErrors(error);
      });

    return await result;
  }

  private handleErrors(error: any): void {
    const { statusCode, message } = error.response.data;

    if (statusCode == 400) throw new BadRequestException(message);
    if (statusCode == 403) throw new ForbiddenException(message);
    if (statusCode == 404) throw new NotFoundException(message);
    throw new UnprocessableEntityException(message);
  }
}
