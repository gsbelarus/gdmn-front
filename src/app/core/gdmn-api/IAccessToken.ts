import { IJwtToken } from '@core/gdmn-api/IJwtToken';

export interface IAccessToken extends IJwtToken {
  id?: number;
  roles?: string[];
}
