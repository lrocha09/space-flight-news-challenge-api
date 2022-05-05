import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IAxiosRequestsProvider } from '../interfaces/axios-requests-provider.interface';

type IAxiosResponse = {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, unknown>;
  config: Record<string, unknown>;
  request: Record<string, unknown>;
};

@Injectable()
export class AxiosRequestsProvider implements IAxiosRequestsProvider {
  async post(
    url: string,
    body?: any,
    headers?: any,
    params?: any,
  ): Promise<IAxiosResponse> {
    return await axios.post(url, body, {
      headers,
      params,
    });
  }

  async get(url: string, headers?: any, params?: any): Promise<IAxiosResponse> {
    return await axios.get(url, {
      headers,
      params,
    });
  }
}
