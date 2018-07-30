import { IAccountLoginRequest } from '@core/gdmn-api/account/IAccountLoginRequest';

export interface IAccountCreateRequest extends IAccountLoginRequest {
  name: string;
}
