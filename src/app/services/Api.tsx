const config = require('configFile');

// TODO types
class Api {
  private static API_URL = `${config.server.http.host}:${config.server.http.port}${config.server.apiPath}`;
  private static ER_URL = `${config.server.http.host}:${config.server.http.port}${config.server.erPath}`;

  private static checkStatus(response: any) {
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
      .then((responseBody: object) => {
        console.log(`[GDMN] HTTP Error (${response.status.toString()}): ${responseBody}`);
        throw Error(`[GDMN] HTTP Error (${response.status.toString()}): ${responseBody}`);
      });
  }

  public static fetch(uri: string, options?: { method?: string; headers?: any; [t: string]: any }) {
    if (!options) options = {};
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || 'application/json';
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    // options.headers['Access-Control-Allow-Origin'] = '*';
    // options.credentials = 'same-origin';

    return fetch(uri, options)
      .catch((err: Error) => {
        console.log('[GDMN] Network request to server failed: ' + err.message); // fixme fetch err to string
        throw new Error('[GDMN] Network request to server failed: ' + err.message);
      })
      .then(Api.checkStatus)
      .then(response => response.text());
  }

  public static fetchQuery(query: string): Promise<object> {
    return Api.fetch(Api.API_URL, {
      method: 'POST',
      body: query
    }).then((responseBody: string) => JSON.parse(responseBody));
  }

  public static fetchEr(): Promise<object> {
    return Api.fetch(Api.ER_URL).then((responseBody: string) => JSON.parse(responseBody));
  }
}

export { Api };
