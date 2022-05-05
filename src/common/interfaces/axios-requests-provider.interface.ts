export interface IAxiosRequestsProvider {
  post(url: string, body?: any, headers?: any, params?: any): Promise<any>;
  get(url: string, headers?: any, params?: any): Promise<any>;
}
