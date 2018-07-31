import { Auth } from '@core/services/Auth';
import { HttpError, httpErrorFactory } from '@core/errors/httpErrors';
import { FetchError } from '@core/errors/FetchError';
import { IResponseError } from '@core/gdmn-api/IResponseError';
import { HttpStatusError } from '@core/errors/HttpStatusError';
import { TAccountRefreshTokenResponse } from '@core/gdmn-api/account/TAccountRefreshTokenResponse';
import { IAccountLoginResponse } from '@core/gdmn-api/account/IAccountLoginResponse';

const enum THttpMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE'
  // UPDATE,
  // PUT
}

const enum TAuthScheme {
  BEARER = 'bearer',
  BASIC = 'basic',
  DIGEST = 'digest'
}

interface IApiEndpoints {
  signIn: string;
  refreshAccessToken: string;
}

class Api<TSignInRequestFormData extends object, TApiEndpoints extends IApiEndpoints> {
  protected readonly apiEndpoints: TApiEndpoints;
  protected readonly authService: Auth;
  protected readonly authScheme: TAuthScheme;

  constructor(apiEndpoints: TApiEndpoints, authService: Auth, authScheme: TAuthScheme) {
    this.apiEndpoints = apiEndpoints;
    this.authScheme = authScheme;
    this.authService = authService;
  }

  public async fetch(uri: string, options: RequestInit = {}): Promise<string | never> {
    options.headers = new Headers(options.headers);
    if (!options.headers.has('Accept')) options.headers.set('Accept', 'application/json');
    if (!options.headers.has('Content-Type')) options.headers.set('Content-Type', 'application/json');
    if (!options.headers.has('Authorization') && (await this.authService.isAuthenticated())) {
      if (!(await this.authService.isFreshAuth())) {
        // TODO extract to middleware
        const { refresh_token, access_token, token_type } = await this.fetchAuthTokens();
        await this.authService.storeTokens(access_token, refresh_token);
      }
      const accessToken = await this.authService.getAccessToken(); // TODO from state
      options.headers.set('Authorization', `${this.authScheme} ${accessToken}`);
    }
    // options.headers['Access-Control-Allow-Origin'] = '*';
    // options.credentials = 'same-origin';
    // options.method = options.method || THttpMethod.GET;

    let response: Response;
    try {
      response = await fetch(uri, options);
    } catch (error) {
      // console.log('[GDMN] Network request to server failed: ' + error.message);
      throw new FetchError(error);
    }

    try {
      Api.checkStatus(response);
      return await response.text();
    } catch (error) {
      throw error instanceof HttpStatusError ? await Api.parseResponseError(error) : error;
    }
  }

  public async fetchAuthTokens(): Promise<TAccountRefreshTokenResponse> {
    const refreshToken = await this.authService.getRefreshToken(); // TODO from state
    const responseBody = await this.fetch(this.apiEndpoints.refreshAccessToken, {
      method: THttpMethod.POST,
      headers: { Authorization: `${this.authScheme} ${refreshToken}` }
    });

    return JSON.parse(responseBody);
  }

  public async fetchMultipartForm(uri: string, formData: FormData): Promise<string | never> {
    return this.fetch(uri, {
      method: THttpMethod.POST,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    });
  }

  public async fetchForm(uri: string, formData: URLSearchParams): Promise<string | never> {
    return this.fetch(uri, {
      method: THttpMethod.POST, // todo test
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
  }

  public async fetchRestQuery(method: THttpMethod, resourseUri: string, query: object | string = ''): Promise<any> {
    const responseBody = await this.fetch(resourseUri + (typeof query === 'string' ? query : ''), {
      method, // todo
      body: method === THttpMethod.POST ? JSON.stringify(query) : undefined
    });

    return JSON.parse(responseBody);
  }

  // TODO extract
  public async fetchSignIn(request: TSignInRequestFormData): Promise<IAccountLoginResponse> {
    const formData = new URLSearchParams();
    Reflect.ownKeys(request).forEach((keyValue: PropertyKey) =>
      formData.set(keyValue.toString(), (<any>request)[keyValue])
    );

    const responseBody = await this.fetchForm(this.apiEndpoints.signIn, formData);
    // console.log('[GDMN] fetchSignIn DONE.');
    const res = <IAccountLoginResponse>JSON.parse(responseBody);
    await this.authService.storeTokens(res.access_token, res.refresh_token); // TODO extract

    return res;
  }

  protected static checkStatus(response: Response): void | never {
    // !ok
    if (!(response.status >= 200 && response.status < 300)) {
      throw new HttpStatusError(response);
    }
  }

  protected static async parseJson(response: Response): Promise<any | never> {
    if (response.status === 204 || response.status === 205) return;

    try {
      return await response.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        // TODO
        console.log('[GDMN] SyntaxError');
        return;
      }

      throw error;
    }
  }

  protected static async parseResponseError(error: HttpStatusError): Promise<HttpError> {
    const responseErrorBody = <IResponseError | undefined>await Api.parseJson(error.response);
    // console.log(
    //   `[GDMN] HTTP Error (${responseErrorBody ? responseErrorBody.originalError.statusCode : ''}): ${responseErrorBody}`
    // );

    return httpErrorFactory(error.response.status, responseErrorBody);
  }
}

export { Api, IApiEndpoints, THttpMethod, TAuthScheme };
