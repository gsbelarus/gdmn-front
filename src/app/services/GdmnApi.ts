import { deserializeERModel, EntityQuery, ERModel, IERModel } from 'gdmn-orm';

import { Auth } from '@core/services/Auth';
import { Api, TAuthScheme, THttpMethod } from '@core/services/Api';
import { IEndpoints } from '@core/gdmn-api/IEndpoints';
import { IAccountLoginRequest } from '@core/gdmn-api/account/IAccountLoginRequest';
import { TBackupGetResponse } from '@core/gdmn-api/backup/TBackupGetResponse';
import { IAppCreateResponse } from '@core/gdmn-api/app/IAppCreateResponse';

class GdmnApi extends Api<IAccountLoginRequest, IEndpoints> {
  constructor(apiEndpoints: IEndpoints, authService: Auth, authScheme: TAuthScheme) {
    super(apiEndpoints, authService, authScheme);
  }

  public async fetchEr(appId?: string): Promise<ERModel> {
    const responseBody = await this.fetch(this.apiEndpoints.er.replace(/\/(:uid)/, appId ? `/${appId}` : ''));
    return deserializeERModel(<IERModel>JSON.parse(responseBody));
  }

  public async fetchEntityQuery(query: EntityQuery, appId: string): Promise<any> {
    const responseBody = await this.fetch(this.apiEndpoints.data.replace(/\/(:uid)/, appId ? `/${appId}` : ''), {
      method: THttpMethod.POST,
      body: '{ "query": ' + query.serialize() + '}'
    });
    return JSON.parse(responseBody);
  }

  public async loadDataStores(): Promise<any> {
    return this.fetchRestQuery(THttpMethod.GET, this.apiEndpoints.app);
  }

  public async deleteDataStore(uid: string): Promise<any> {
    return this.fetchRestQuery(THttpMethod.DELETE, this.apiEndpoints.app, `/${uid}`);
  }

  public async createDataStore(alias: string): Promise<IAppCreateResponse> {
    return this.fetchRestQuery(THttpMethod.POST, this.apiEndpoints.app, { alias });
  }

  public async loadBackups(appId: string): Promise<TBackupGetResponse> {
    return this.fetchRestQuery(THttpMethod.GET, this.apiEndpoints.backup.replace(/\/(:uid)/, appId ? `/${appId}` : ''));
  }

  public async createBackup(appId: string, alias: string): Promise<void> {
    return this.fetchRestQuery(
      THttpMethod.POST,
      this.apiEndpoints.backup.replace(/\/(:uid)/, appId ? `/${appId}` : ''),
      { alias }
    );
  }

  public async restoreBackup(appId: string, backupUid: string, alias: string): Promise<void> {
    return this.fetchRestQuery(
      THttpMethod.POST,
      this.apiEndpoints.restoreBackup
        .replace(/\/(:uid)/, appId ? `/${appId}` : '')
        .replace(/\/(:backupUid)/, backupUid ? `/${backupUid}` : ''),
      { alias }
    );
  }

  public async downloadBackup(appId: string, backupUid: string): Promise<string> {
    return this.fetch(
      this.apiEndpoints.downloadBackup
        .replace(/\/(:uid)/, appId ? `/${appId}` : '')
        .replace(/\/(:backupUid)/, backupUid ? `/${backupUid}` : ''),
      {
        method: THttpMethod.GET,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      }
    );
  }

  public async deleteBackup(appId: string, backupUid: string): Promise<void> {
    return this.fetchRestQuery(
      THttpMethod.DELETE,
      this.apiEndpoints.deleteBackup
        .replace(/\/(:uid)/, appId ? `/${appId}` : '')
        .replace(/\/(:backupUid)/, backupUid ? `/${backupUid}` : '')
    );
  }

  public async uploadBackup(appId: string, alias: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('alias', alias);
    formData.append('bkpFile', file);

    await this.fetchMultipartForm(
      this.apiEndpoints.uploadBackup.replace(/\/(:uid)/, appId ? `/${appId}` : ''),
      formData
    );
  }
}

export { GdmnApi, IEndpoints };
