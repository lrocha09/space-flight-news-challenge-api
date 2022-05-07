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
    //Segue sugestão de refatoração neste ponto
    // const result = this.axiosRequestsProvider
    //   .get(`${process.env.BASE_URL_SPACEFLIGHT}/articles/count`, {
    //     accept: 'application/json',
    //   })
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     this.handleErrors(error);
    //   });

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

  private getArticlesCountUrl(): string {
    return `${this.getArticlesBaseUrl()}/count`;
  }

  async findArticles(
    limit?: number,
    sortBy?: string,
  ): Promise<CreateArticleDto[]> {
    // Acredito que não seja de responsabilidade do método findArticles fazer essa construção
    // dos parâmetros, eu exportaria essa lógica para um outro método
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
        this.getArticlesBaseUrl(),
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

  private getArticlesBaseUrl(): string {
    return `${process.env.BASE_URL_SPACEFLIGHT}/articles`;
  }

  private handleErrors(error: any): void {
    const { statusCode, message } = error.response.data;

    // O que significa 400, 403 e 404? Esses numeros soltos assim são um code smell conhecido como magic numbers
    // eu criaria constantes dizendo o que cada um desses numeros representa, por ex:
    // const HTTP_NOT_FOUND_CODE = 404, ou até mesmo um enum q poderia ser utilizado por outras funções posteriormente
    if (statusCode == 400) throw new BadRequestException(message);
    if (statusCode == 403) throw new ForbiddenException(message);
    if (statusCode == 404) throw new NotFoundException(message);
    throw new UnprocessableEntityException(message);
  }
}
