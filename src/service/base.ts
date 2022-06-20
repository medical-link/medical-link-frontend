import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from '~/constants';

abstract class BaseApiService {
  protected readonly http: AxiosInstance;

  protected constructor(protected readonly path?: string) {
    this.http = axios.create({
      baseURL: `${process.env.BASE_URL ?? 'http://114.200.215.69:9090'}/api/v1/${path ?? ''}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected static handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  protected static handleError(error: unknown): never {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw error;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          throw new Error(error as any);
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
      }
    }
    throw new Error(error as any);
  }
}

export default BaseApiService;
