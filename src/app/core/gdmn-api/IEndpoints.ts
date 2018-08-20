import { IApiEndpoints } from '@core/services/Api';

export interface IEndpoints extends IApiEndpoints {
  data: string;
  er: string;
  app: string;
  backup: string;
  downloadBackup: string;
  restoreBackup: string;
  uploadBackup: string;
  deleteBackup: string;

  [t: string]: any; // todo
}
