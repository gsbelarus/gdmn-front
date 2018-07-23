import { EntityQuery } from 'gdmn-orm';

import { Auth } from '@core/services/Auth';
import { Api } from '@core/services/Api';

// TODO interface
// TODO response type
class GdmnApi extends Api {
  private readonly dataApiUrl: string;
  private readonly erApiUrl: string;

  constructor(
    authService: Auth,
    authScheme: string,
    dataApiUrl: string,
    erApiUrl: string,
    signInUrl: string,
    signInUsernameFieldName: string,
    signInPasswordFieldName: string
  ) {
    super(authService, authScheme, signInUrl, signInUsernameFieldName, signInPasswordFieldName);

    this.dataApiUrl = dataApiUrl;
    this.erApiUrl = erApiUrl;
  }

  public async fetchQuery(query: EntityQuery, urlOptions?: string): Promise<object> {
    return this.fetch(
      this.dataApiUrl,
      // + urlOptions, // TODO mock-server
      {
        // method: 'GET' // TODO mock-server
        method: 'POST',
        body: query.serialize()
      }
    )
      .then((responseBody: string) => JSON.parse(responseBody))
      .then(res => {
        console.log('[GDMN] fetchQuery DONE.');
        return res;
      });
  }

  public async fetchEr(): Promise<object> {
    return this.fetch(this.erApiUrl)
      .then((responseBody: string) => JSON.parse(responseBody))
      .then(res => {
        console.log('[GDMN] fetchEr DONE.');
        return res;
      });
  }
}

export { GdmnApi };
