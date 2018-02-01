/**
 * Tracking Disabled:
 * ?&lsid=&bfp=&cookies=false
 * Tracking Enabled:
 * ?&lsid=0719cec6-224a-46d5-aa5d-94c2a0ce43b6&bfp=6f2692d5f66b88906ef73683ef517bf6&cookies=true
 */

import { DefaultApi } from './CitrusApi';
import { CitrusTrack } from './CitrusTrack';

interface IOptions {
  disableTracking?: boolean;
}

export class CitrusAd {
  // Initial attempt plus 3 retries
  private static MAX_RETRIES = 3;
  private api: DefaultApi;
  private citrusTrack: CitrusTrack;

  static init(apiAddress: string, options: IOptions = {}): CitrusAd {
    return new CitrusAd(apiAddress, options);
  }

  private constructor(apiAddress: string, private options: IOptions = {}) {
    this.api = new DefaultApi(undefined, apiAddress);
    this.citrusTrack = new CitrusTrack(options.disableTracking);
  }

  async reportImpression(adId: string): Promise<Response> {
    const trackingParams = await this.citrusTrack.getTrackingParams();
    return this.executeAction(
      () => this.api.reportImpression({ adId, ...trackingParams }),
    );
  }

  async reportClick(adId: string): Promise<Response> {
    const trackingParams = await this.citrusTrack.getTrackingParams();
    return this.executeAction(
      () => this.api.reportClick({ adId, ...trackingParams }),
    );
  }

  async getTrackingInformation() {
    return await this.citrusTrack.getTrackingParams();
  }

  private timeout(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  private async executeAction(action: () => Promise<any>, retries: number = 0): Promise<Response> {
    try {
      return await action();
    } catch (err) {
      if (retries < CitrusAd.MAX_RETRIES) {
        const incRetries = retries + 1;
        await this.timeout(incRetries);
        return this.executeAction(action, incRetries);
      } else {
        throw err;
      }
    }
  }

}

