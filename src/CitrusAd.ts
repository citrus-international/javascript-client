import {DefaultApi, DefaultApiApiKeys} from './generated/api';
import {Payload} from './Payload';
import {PayloadSigner} from './PayloadSigner';

export class CitrusAd {

  private api: DefaultApi;
  private payload: Payload;
  private token: string;

  private constructor(private payloadSigner: PayloadSigner, private issuerId: string, private apiAddress: string) {
    this.api = new DefaultApi(apiAddress);
  }

  static init(payloadSigner: PayloadSigner, issuerId: string, apiAddress: string): CitrusAd {
    return new CitrusAd(payloadSigner, issuerId, apiAddress);
  }

  private async checkToken() {
    if (this.token == null || this.payload == null || this.payload.isExpired()) {
      this.payload = new Payload(this.issuerId);
      this.token = await this.payloadSigner(this.payload);
      this.api.setApiKey(DefaultApiApiKeys.TokenSecurity, this.token);
    }
  }

  async registerImpression(adId: string): Promise<boolean> {
    const retries = 3;
    let result = false;
    while (retries > 0) {
      try {
        await this.checkToken();
        await this.api.registerImpression(adId);
        result = true;
        break;
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    return result;
  }

  async registerClick(adId: string): Promise<boolean> {
    const retries = 3;
    let result = false;
    while (retries > 0) {
      try {
        await this.checkToken();
        await this.api.registerClick(adId);
        result = true;
        break;
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    return result;
  }
}