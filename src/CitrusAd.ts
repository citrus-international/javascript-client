import { DefaultApi } from './CitrusApi';
import { CitrusTrack } from './CitrusTrack'
type TokenProvider = () => Promise<string>;

export class CitrusAd {
  private static MAX_RETRIES = 3;
  private api: DefaultApi;
  private token: string;

  static init(getToken: TokenProvider, apiAddress: string): CitrusAd {
    return new CitrusAd(getToken, apiAddress);
  }

  private constructor(private getToken: TokenProvider, private apiAddress: string) {
    this.api = new DefaultApi(undefined, apiAddress);
    CitrusTrack.init('CitrusUID');
  }

  async reportImpression(adId: string, teamId: string): Promise<void> {
    return this._executeAction(() => this.api.reportImpression({adId, teamId}, this._getAdditionalOptions()), 0);
  }

  async reportClick(adId: string, teamId: string): Promise<void> {
    return this._executeAction(() => this.api.reportClick({adId, teamId}, this._getAdditionalOptions()), 0);
  }

  private async checkToken(force?: true) {
    if (this.token == null || force) {
      this.token = await this.getToken();
    }
  }

  private _getAdditionalOptions() {
    return { headers: { Authorization: 'Bearer ' + this.token }};
  }

  private _timeout(milliseconds: number) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  private async _executeAction(action: () => Promise<any>, retries: number = 0): Promise<void> {
    try {
      await this.checkToken();
      await action();
      return;
    } catch (err) {
      if (retries < CitrusAd.MAX_RETRIES) {
        if (err.status === 401) {
          // If checkToken throws an exception do we want to catch it?
          await this.checkToken(true);
        }
        retries++;
        await this._timeout(retries * 1000);
        return this._executeAction(action, retries);
      } else {
        throw err;
      }
    }
  }

}

