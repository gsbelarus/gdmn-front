import jwtDecode from 'jwt-decode';

import { WebStorage } from '@core/services/WebStorage';
import { IJwtToken } from '@core/gdmn-api/IJwtToken';

// TODO interface IAuth {}

const enum UserRoleType {
  ANONYM,
  USER,
  ADMIN,
  DEVELOPER
}

class Auth {
  public static ACCESS_TOKEN_MIN_EXPIRES_SECONDS = 3600;
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

  public async getDecodedAccessToken() {
    return Auth.decodeToken(await this.getAccessToken());
  }

  public async isAuthenticated() {
    return (await this.getAccessToken()) !== null;
  }

  public static decodeToken(token: string): IJwtToken {
    return jwtDecode<IJwtToken>(token);
  }

  private static getExpiredTokenTime(token: IJwtToken) {
    const timeNow = +new Date() / 1000; // TODO
    return timeNow - token.iat;
  }

  public static isExpiredToken(token: IJwtToken): boolean {
    return Auth.getExpiredTokenTime(token) > token.exp;
  }

  /**
   * no need refresh token
   */
  public static isFreshToken(token: IJwtToken): boolean {
    if (Auth.isExpiredToken(token)) return false; // session has expired - login in again

    return Auth.getExpiredTokenTime(token) + Auth.ACCESS_TOKEN_MIN_EXPIRES_SECONDS < token.exp;
  }
}

export { Auth, UserRoleType };
