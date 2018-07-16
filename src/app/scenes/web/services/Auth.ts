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
  private readonly accessTokenName: string;
  private webStorage: WebStorage;

  private static routeAccessLevels = {
    // todo
    anonym: [UserRoleType.ANONYM],
    // 'public':    '*',
    user: [UserRoleType.USER, UserRoleType.ADMIN, UserRoleType.DEVELOPER],
    admin: [UserRoleType.ADMIN, UserRoleType.DEVELOPER],
    developer: [UserRoleType.DEVELOPER]
  }; // TODO: bitMask

  constructor(accessTokenName: string, webStorage: WebStorage) {
    this.accessTokenName = accessTokenName;
    this.webStorage = webStorage;
  }

  public async storeAccessToken(accessToken: any) {
    await this.webStorage.set(this.accessTokenName, accessToken);
  }

  public async removeAccessToken() {
    await this.webStorage.remove(this.accessTokenName);
  }

  public async getAccessToken() {
    return this.webStorage.get(this.accessTokenName);
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
