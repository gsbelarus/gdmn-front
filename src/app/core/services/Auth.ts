import jwtDecode from 'jwt-decode';

import { WebStorage } from '@core/services/WebStorage';
import { IJwtToken } from '@core/gdmn-api/IJwtToken';
import { IAccessToken } from '@core/gdmn-api/IAccessToken';
import { IRefreshToken } from '@core/gdmn-api/IRefreshToken';

const enum UserRoleType {
  ANONYM,
  USER,
  ADMIN,
  DEVELOPER
}

class Auth {
  public static ACCESS_TOKEN_MIN_EXPIRES_SECONDS = 3600; // 1 hour
  public static ACCESS_TOKEN_STORAGE_KEY = 'access_token';
  public static REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

  private webStorage: WebStorage;

  constructor(webStorage: WebStorage) {
    this.webStorage = webStorage;
  }

  // public

  public async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    await this.webStorage.set(Auth.ACCESS_TOKEN_STORAGE_KEY, accessToken);
    await this.webStorage.set(Auth.REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }

  public async removeTokens(): Promise<void> {
    await this.webStorage.remove(Auth.ACCESS_TOKEN_STORAGE_KEY);
    await this.webStorage.remove(Auth.REFRESH_TOKEN_STORAGE_KEY);
  }

  public async getAccessToken(): Promise<string> {
    return this.webStorage.get(Auth.ACCESS_TOKEN_STORAGE_KEY);
  }

  public async getRefreshToken(): Promise<string> {
    return this.webStorage.get(Auth.REFRESH_TOKEN_STORAGE_KEY);
  }

  public async getDecodedAccessToken(): Promise<IAccessToken> {
    return Auth.decodeToken(await this.getAccessToken());
  }

  public async getDecodedRefreshToken(): Promise<IRefreshToken> {
    return Auth.decodeToken(await this.getRefreshToken());
  }

  public async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getAccessToken();
    return accessToken !== null && refreshToken !== null;
  }

  public async isFreshAuth(): Promise<boolean> {
    const accessToken = await this.getDecodedAccessToken(); // TODO from state
    return Auth.isFreshToken(accessToken);
  }

  public static decodeToken(token: string): IJwtToken {
    return jwtDecode<IJwtToken>(token);
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

  private static getExpiredTokenTime(token: IJwtToken): number {
    const timeNow = +new Date() / 1000; // todo test
    return timeNow - token.iat;
  }
}

export { Auth, UserRoleType };
