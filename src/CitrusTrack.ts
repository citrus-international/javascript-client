import * as Cookies from 'cookies-js';
import * as uuidv4 from 'uuid/v4';

export class CitrusTrack {

  static init(cookieName: string) {
    if (Cookies.enabled) {
      this.checkCookie(cookieName);
    }
  }

  private static checkCookie(cookieName: string) {
    const cookie = Cookies.get(cookieName)
    const cookieWithoutDashes = uuidv4().replace(/-/g, '')
    if (!cookie) {
      Cookies.set(cookieName, cookieWithoutDashes, {
        domain: '.citrusad.com',
        expires: Infinity
      });
    }
  }

}
