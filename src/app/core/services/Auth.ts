import jwtDecode from 'jwt-decode';

import { WebStorage } from '@core/services/WebStorage';

// TODO interface IAuth {}

const enum UserRoleType {
  ANONYM,
  USER,
  ADMIN,
  DEVELOPER
}

class Auth {
  public static ACCESS_TOKEN_STORAGE_KEY = 'access_token';

  private webStorage: WebStorage;

  constructor(webStorage: WebStorage) {
    this.webStorage = webStorage;
  }

  public async storeAccessToken(accessToken: any) {
    await this.webStorage.set(Auth.ACCESS_TOKEN_STORAGE_KEY, accessToken);
  }

  public async removeAccessToken() {
    await this.webStorage.remove(Auth.ACCESS_TOKEN_STORAGE_KEY);
  }

  public async getAccessToken() {
    return this.webStorage.get(Auth.ACCESS_TOKEN_STORAGE_KEY);
  }

  public async decodeAccessToken() {
    return jwtDecode(await this.getAccessToken());
  }

  public async isAuthenticated() {
    return (await this.getAccessToken()) !== null; // TODO verify
  }
}

export { Auth, UserRoleType };
