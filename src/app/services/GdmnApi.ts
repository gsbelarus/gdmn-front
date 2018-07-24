import { EntityQuery } from 'gdmn-orm';

import { Auth } from '@core/services/Auth';
import { Api } from '@core/services/Api';

const enum FetchMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE'
  // UPDATE,
  // PUT
}

// TODO interface
// TODO response type
class GdmnApi extends Api {
  private readonly dataApiUrl: string;
  private readonly erApiUrl: string;
  private readonly appApiUrl: string;

  constructor(
    authService: Auth,
    authScheme: string,
    dataApiUrl: string,
    erApiUrl: string,
    signInUrl: string,
    appApiUrl: string,
    signInUsernameFieldName: string,
    signInPasswordFieldName: string
  ) {
    super(authService, authScheme, signInUrl, signInUsernameFieldName, signInPasswordFieldName);

    this.dataApiUrl = dataApiUrl;
    this.erApiUrl = erApiUrl;
    this.appApiUrl = appApiUrl;
  }

  public async fetchEr(): Promise<object> {
    return this.fetch(this.erApiUrl)
      .then((responseBody: string) => JSON.parse(responseBody))
      .then(res => {
        console.log('[GDMN] fetchEr DONE.');
        return res;
      });
  }

  public async fetchQuery(query: EntityQuery, urlOptions?: string): Promise<object> {
    return this.fetch(
      this.dataApiUrl,
      // + urlOptions, // TODO mock-server
      {
        // method: 'GET' // TODO mock-server
        method: FetchMethod.POST,
        body: query.serialize()
      }
    )
      .then((responseBody: string) => JSON.parse(responseBody))
      .then(res => {
        console.log('[GDMN] fetchQuery DONE.');
        return res;
      });
  }

  public async fetchRestQuery(method: FetchMethod, resourseUri: string, query: object | string = '') {
    return this.fetch(resourseUri + (typeof query === 'string' ? query : ''), {
      method: method.toString(),
      body: method === FetchMethod.POST ? JSON.stringify(query) : null
    }).then((responseBody: string) => JSON.parse(responseBody));
  }

  public async loadApps(): Promise<object> {
    return this.fetchRestQuery(FetchMethod.GET, this.appApiUrl).then(res => {
      console.log('[GDMN] loadApps DONE.');
      return res;
    });
  }

  public async deleteApp(uid: string): Promise<object> {
    return this.fetchRestQuery(FetchMethod.DELETE, this.appApiUrl, `/${uid}`).then(res => {
      console.log('[GDMN] deleteApp DONE.');
      return res;
    });
  }

  public async createApp(alias: string): Promise<object> {
    return this.fetchRestQuery(FetchMethod.POST, this.appApiUrl, { alias }).then(res => {
      console.log('[GDMN] createApp DONE.');
      return res;
    });
  }
}

export { GdmnApi, FetchMethod };
