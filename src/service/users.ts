import { ACCESS_TOKEN } from '~/constants';
import { UserIdResponse, UserDataResponse, PostSignUpRequest } from '~/service';
import BaseApiService from './base';

class UsersApiService extends BaseApiService {
  public constructor() {
    super('users');
  }

  public getUserId(): Promise<UserIdResponse> {
    return this.http
      .get('/id', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public getUserData(): Promise<UserDataResponse> {
    return this.http
      .get('/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public postLogout(): Promise<unknown> {
    return this.http
      .post('/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public postMyData(): Promise<unknown> {
    return this.http
      .post('/mydata', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public postSignUp({ age, name, sex }: PostSignUpRequest): Promise<unknown> {
    return this.http
      .post(
        '/signup',
        {
          age,
          name,
          sex,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        },
      )
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }
}

export default new UsersApiService();
