import { ACCESS_TOKEN, USER_ID } from '~/constants';
import {
  LoginRequest,
  LoginResponse,
  AuthVerifyResponse,
  UserDataResponse,
  AuthVerifyRequest,
} from '~/service';
import BaseApiService from './base';

class AuthApiService extends BaseApiService {
  public constructor() {
    super('auth');
  }

  public postLogin({ authCode }: LoginRequest): Promise<LoginResponse> {
    return this.http
      .post('/token', { code: authCode })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public postAuthVerify(): Promise<AuthVerifyResponse> {
    return this.http
      .post('/verify', null, {
        params: {
          userId: localStorage.getItem(USER_ID),
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }
}

export default new AuthApiService();
