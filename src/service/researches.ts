import { ACCESS_TOKEN } from '~/constants';

import BaseApiService from './base';
import { ResearchesDetailResponseData, ResearchesRequestData, ResearchesResponseData } from './dto';

class ResearchesApiService extends BaseApiService {
  public constructor() {
    super('researches');
  }

  public getResearches({
    category, page, size, value,
  }: ResearchesRequestData): Promise<ResearchesResponseData> {
    return this.http
      .get('/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        params: {
          category,
          page,
          size,
          value,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public getResearchesDetail({
    id,
  }: {
    id: string;
  }): Promise<ResearchesDetailResponseData> {
    return this.http
      .get(`/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      })
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public postResearchesLike({
    researchId,
  }: {
    researchId: number;
  }): Promise<unknown> {
    return this.http
      .post(
        `/likes/${researchId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        },
      )
      .then(BaseApiService.handleResponse)
      .catch(BaseApiService.handleError);
  }

  public deleteResearchesLike({
    researchId,
  }: {
    researchId: number;
  }): Promise<unknown> {
    return this.http
      .delete(
        `/likes/${researchId}`,
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

export default new ResearchesApiService();
