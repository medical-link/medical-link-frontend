import axios, { AxiosInstance, AxiosResponse } from 'axios';

abstract class BaseApiService {
  protected readonly http: AxiosInstance;

  protected constructor(protected readonly path?: string) {
    this.http = axios.create({
      baseURL: `http://192.168.0.43:8080/api/v1/${
        path ?? ''
      }`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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
