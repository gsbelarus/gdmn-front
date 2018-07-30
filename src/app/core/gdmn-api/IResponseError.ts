import { TResponseErrorCode } from '@core/gdmn-api/TResponseErrorCode';

export interface IResponseError {
  error: string;
  stack?: string;
  originalError: {
    expose: boolean;
    statusCode: number;
    status: number;
    code?: TResponseErrorCode;
    fields?: any[];
  };
  message?: string;
}
