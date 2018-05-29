class Api {
  private static QUERY_API_URL = 'http://192.168.0.78:4000/data'; // TODO config

  private static checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) return response;

    return response.json().catch((error: any) => {
      if (error instanceof SyntaxError) {
        console.log('SyntaxError');
        return {};
      }
      throw error;
    });
    // .then( (responseBody) => {
    //   throw createHttpError(response.status, responseBody);
    // });
  }

  public static request(uri: string, options: { method?: string; headers?: any; [t: string]: any }) {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    options.headers.Accept = options.headers.Accept || 'application/json';
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    // options.headers['Access-Control-Allow-Origin'] = '*';
    // options.credentials = 'same-origin';

    return fetch(uri, options)
      .catch(fetchError => {
        throw new Error('Network request to server failed: ' + fetchError.toString());
      })
      .then(Api.checkStatus)
      .then(response => {
        return response.text();
      });
  }

  public static queryFetch(query: any): Promise<any> {
    return Api.request(Api.QUERY_API_URL, { method: 'POST', body: JSON.stringify(query) });
  }
}

export default Api;
