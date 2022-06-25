import { BaseResponse } from './base';

export interface ResearchData {
  id: number;
  illness: string;
  title: string;
  level: string;
  country: string;
  status: string;
  productName: string;
  exclusionCriteria: string;
  periodStart: string;
  periodEnd: string;
  facilityDto: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
  };
  like: boolean;
}

export type CategoryType =
  | 'illness'
  | 'location'
  | 'personal'
  | 'likes'
  | 'facility';

export interface ResearchesRequestData {
  category?: 'illness' | 'location' | 'personal' | 'likes' | 'facility' | '';
  page: number;
  size: number;
  value?: string;
}

export type ResearchesResponseData = BaseResponse<ResearchData[]>;

export interface ResearchesDetailResponseData {
  id: number;
  detailURL: string;
  info: Array<{
    [key: string]: string;
  }>;
  facilityName: string;
  status: string;
  like: boolean;
}
