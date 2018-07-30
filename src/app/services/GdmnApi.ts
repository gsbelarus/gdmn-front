import { deserializeERModel, EntityQuery, ERModel, IERModel } from 'gdmn-orm';

import { Auth } from '@core/services/Auth';
import { Api, TAuthScheme, THttpMethod } from '@core/services/Api';
import { IEndpoints } from '@core/gdmn-api/IEndpoints';
import { IAccountLoginRequest } from '@core/gdmn-api/account/IAccountLoginRequest';

class GdmnApi extends Api<IAccountLoginRequest, IEndpoints> {
  constructor(apiEndpoints: IEndpoints, authService: Auth, authScheme: TAuthScheme) {
    super(apiEndpoints, authService, authScheme);
  }

  public async fetchEr(): Promise<ERModel> {
    const responseBody = await this.fetch(this.apiEndpoints.er);
    return deserializeERModel(<IERModel>JSON.parse(responseBody));
  }

  public async fetchEntityQuery(query: EntityQuery): Promise<any> {
    const responseBody = await this.fetch(this.apiEndpoints.data, {
      method: THttpMethod.POST,
      body: query.serialize()
    });
    return JSON.parse(responseBody);
  }

  public async loadApps(): Promise<any> {
    return this.fetchRestQuery(THttpMethod.GET, this.apiEndpoints.app);
  }

  public async deleteApp(uid: string): Promise<any> {
    return this.fetchRestQuery(THttpMethod.DELETE, this.apiEndpoints.app, `/${uid}`);
  }

  public async createApp(alias: string): Promise<any> {
    return this.fetchRestQuery(THttpMethod.POST, this.apiEndpoints.app, { alias });
  }
}

export { GdmnApi, IEndpoints };
