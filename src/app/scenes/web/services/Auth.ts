import jwtDecode from 'jwt-decode';

import { WebStorage } from './WebStorage';

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

  private static routeAccessLevels = {
    // todo
    anonym: [UserRoleType.ANONYM],
    // 'public':    '*',
    user: [UserRoleType.USER, UserRoleType.ADMIN, UserRoleType.DEVELOPER],
    admin: [UserRoleType.ADMIN, UserRoleType.DEVELOPER],
    developer: [UserRoleType.DEVELOPER]
  }; // TODO: bitMask

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
    // todo decode async?
    return jwtDecode(await this.getAccessToken());
  }

  public async isAuthenticated() {
    return (await this.getAccessToken()) !== null; // TODO verify
  }

  public static checkAccess(requiredLevel: [UserRoleType], userRole: UserRoleType) {
    return requiredLevel.includes(userRole);
  }
}

export { Auth };
