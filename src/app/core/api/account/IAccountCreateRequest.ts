import { IAccountLoginRequest } from '@core/api/account/IAccountLoginRequest';

export interface IAccountCreateRequest extends IAccountLoginRequest {
  name: string;
}
