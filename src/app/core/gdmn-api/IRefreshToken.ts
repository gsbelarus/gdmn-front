import { IJwtToken } from '@core/gdmn-api/IJwtToken';

export interface IRefreshToken extends IJwtToken {
  [t: string]: any; // TODO tmp
}
