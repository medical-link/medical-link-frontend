import { ACCESS_TOKEN } from '~/constants';

import BaseApiService from './base';

class HealthApiService extends BaseApiService {
  public constructor() {
    super('health');
  }

  public getHealthInfoList(): Promise<unknown> {
    return this.http
      .get('/infoList', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }
}

export default new HealthApiService();
