// import { CitrusAd } from '../src/CitrusAd';
declare var CitrusAd;

const DEV_ENDPOINT = 'https://dev-integration.citrusad.com/v1';

describe('Test suit for CitrusAd JS Library', () => {

  const RANDOM_AD_ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  describe('can report', () => {
    let citrusAd: any = null;
    beforeEach(() => {
      citrusAd = CitrusAd.init(DEV_ENDPOINT);
    });

    it('impression', () => {
      return citrusAd.reportImpression(RANDOM_AD_ID);
    });

    it('click', () => {
      return citrusAd.reportClick(RANDOM_AD_ID);
    });

  });

});
