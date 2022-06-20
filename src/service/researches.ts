import { ACCESS_TOKEN } from '~/constants';

import BaseApiService from './base';

class ResearchesApiService extends BaseApiService {
  public constructor() {
    super('researches');
  }

  public getResearches(): Promise<unknown> {
    return this.http
      .get('/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public getResearchesDetail({ id } : { id: string}): Promise<unknown> {
    return this.http
      .get(`/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }
}

export default new ResearchesApiService();
