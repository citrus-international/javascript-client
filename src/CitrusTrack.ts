import * as uuidv4 from 'uuid/v4';
import * as Fingerprint2 from 'fingerprintjs2';

export class CitrusTrack {

  private static LSKEY = 'citrusLSID';
  private bfp: Promise<string>;
  private lsid: Promise<string>;

  constructor(private disableTracking: boolean, fingerPrinter = Fingerprint2, private wnd: Window = window) {
    this.lsid = disableTracking ? Promise.resolve(null) : this.getOrCreateLSID();
    this.bfp = disableTracking ? Promise.resolve(null) : new Promise((resolve, reject) => {
      new fingerPrinter().get(resolve);
    });
  }

  async getTrackingParams() {
    return {
      bfp: await this.bfp,
      lsid: await this.lsid,
      cookies: !this.disableTracking,
    };
  }

  private getOrCreateLSID(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.storageAvailable('localStorage')) {
        const citrusLSID = this.wnd.localStorage.getItem(CitrusTrack.LSKEY);
        if (citrusLSID) {
          resolve(citrusLSID);
        } else {
          const newCitrusLSID = uuidv4();
          this.wnd.localStorage.setItem(CitrusTrack.LSKEY, newCitrusLSID);
          resolve(newCitrusLSID);
        }
      } else {
        resolve('');
      }
    });
  }

  // Borrowed from MSDN
  private storageAvailable(type: string) {
    let storage;
    try {
      storage = (this.wnd as any)[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage as any).length !== 0;
    }
  }

}
