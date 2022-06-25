import { BaseResponse } from './base';

export interface MedicalRecord {
  id: number;
  recordDate: string;
  diagnosisType: string;
  facilityName: string;
  medicineInfoList: {
    id: number;
    medicineType: string;
    name: string;
  }[];
}

export interface MedicalTest {
  id: number;
  facilityName: string;
  testDate: string;
  medicalStatusList: {
    id: number;
    testType: string;
    value: string;
  }[];
}

export interface MedicalRequestData {
  page: number;
  size: number;
}

export type MedicalRecordResponseData = BaseResponse<MedicalRecord[]>;
export type MedicalTestResponseData = BaseResponse<MedicalTest[]>;
