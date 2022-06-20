import { BaseResponse } from './base';
import { User } from './users';

export interface LoginResponseData {
  accessToken: string;
}

export interface AuthVerifyRequest {
  userId: string;
}
export type AuthVerifyResponse = BaseResponse<Pick<User, 'userId'>>;

export interface LoginRequest {
  authCode: string;
}
export type LoginResponse = BaseResponse<LoginResponseData>;
