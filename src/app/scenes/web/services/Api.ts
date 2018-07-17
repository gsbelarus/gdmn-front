import { Auth } from '@src/app/scenes/web/services/Auth';
import { IServerResponseError, httpErrorFactory } from '@src/app/scenes/web/errors/httpErrors';
import { FetchError } from '@src/app/scenes/web/errors/FetchError';

// TODO interface
// TODO response type
class Api {
  protected readonly authService: Auth;
  protected readonly authScheme: string;

  protected readonly signInUrl: string;
  protected readonly signInUsernameFieldName: string;
  protected readonly signInPasswordFieldName: string;

  constructor(
    authService: Auth,
    authScheme: string,
    signInUrl: string,
    signInUsernameFieldName: string,
    signInPasswordFieldName: string
  ) {
    this.signInUrl = signInUrl;
    this.signInUsernameFieldName = signInUsernameFieldName;
    this.signInPasswordFieldName = signInPasswordFieldName;
    this.authScheme = authScheme;
    this.authService = authService;
  }

  protected static async checkStatus(response: any): Promise<any> {
    if (response.status >= 200 && response.status < 300) return response;

    return response
      .json()
      .catch((error: Error) => {
        if (error instanceof SyntaxError) {
          console.log('[GDMN] SyntaxError');

          return {};
        }

        throw error;
      })
      .then((responseBody: IServerResponseError) => {
        console.log(`[GDMN] HTTP Error (${response.status.toString()}): ${responseBody}`);

        throw httpErrorFactory(response.status, responseBody);
      });
  }

  public async fetch(uri: string, options?: { method?: string; headers?: any; [t: string]: any }): Promise<any> {
    if (!options) options = {};
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || 'application/json';
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    // options.headers['Access-Control-Allow-Origin'] = '*';
    // options.credentials = 'same-origin';
    const accessToken = await this.authService.getAccessToken();
    if (accessToken !== null) {
      options.headers.Authorization = `${this.authScheme} ${accessToken}`;
    }

    return fetch(uri, options)
      .catch((err: Error) => {
        console.log('[GDMN] Network request to server failed: ' + err.message);

        throw new FetchError(err);
      })
      .then(Api.checkStatus)
      .then(response => response.text());
  }

  public async fetchSignIn(username: string, password: string): Promise<object> {
    return this.fetch(this.signInUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `${this.signInUsernameFieldName}=${username}&${this.signInPasswordFieldName}=${password}`
    })
      .then((responseBody: string) => JSON.parse(responseBody))
      .then(res => {
        console.log('[GDMN] fetchSignIn DONE.');
        return res;
      });
  }
}

export { Api };
