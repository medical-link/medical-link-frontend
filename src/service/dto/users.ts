import { BaseResponse } from './base';

export interface User {
  name: string;
  age: number;
  sex: '남' | '여';
  userId: string;
  kakaoId: string;
  illnessList: string[];
}

export interface UserIdResponseData {
  userId: string;
}

export type UserIdResponse = BaseResponse<UserIdResponseData>;

export type UserDataResponse = BaseResponse<User>;

export type PostSignUpRequest = Pick<User, 'age' | 'name' | 'sex'>;
