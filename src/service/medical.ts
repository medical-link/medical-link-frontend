import { ACCESS_TOKEN } from '~/constants';

import BaseApiService from './base';
import {
  MedicalRecordResponseData,
  MedicalRequestData,
  MedicalTestResponseData,
} from './dto';

class MedicalApiService extends BaseApiService {
  public constructor() {
    super('');
  }

  public getMedicalRecordList({
    page,
    size,
  }: MedicalRequestData): Promise<MedicalRecordResponseData> {
    return this.http
      .get('/medicalRecords', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        params: { page, size },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public getMedicalTestList({
    page,
    size,
  }: MedicalRequestData): Promise<MedicalTestResponseData> {
    return this.http
      .get('/medicalTests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        params: { page, size },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }
}

export default new MedicalApiService();
