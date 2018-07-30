import { IApiEndpoints } from '@core/services/Api';

export interface IEndpoints extends IApiEndpoints {
  data: string;
  er: string;
  app: string;
}
