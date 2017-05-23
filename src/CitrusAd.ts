import {PayloadSigner} from "./operations/PayloadSigner";
import {Context} from "./models/Context";
import {AdResponseHandler} from "./operations/AdResponseHandler";
import {AdResponse} from "./models/AdResponse";
import {Ad} from "./models/Ad";
export class CitrusAd {

  private constructor(private payloadSigner: PayloadSigner, private issuerId: string) {

  }

  static init(payloadSigner: PayloadSigner, issuerId: string): CitrusAd {
    return new CitrusAd(payloadSigner, issuerId);
  }

  getAds(context: Context, adResponseHanlder: AdResponseHandler) {

    var ad1: Ad = {
      gtin: '1234',
      adId: 'asdfadfa',
      price: 2.20
    };

    var ad2: Ad = {
      gtin: '1234',
      adId: 'asdfadfa',
      price: null
    };

    var ads: Array<Ad> = [
      ad1, ad2
    ];
    var response: AdResponse = {
      ads: ads,
      isSuccessful: true
    };

    adResponseHanlder.handleResponse(response);
  }

  registerClick(adId: string) {

  }
}