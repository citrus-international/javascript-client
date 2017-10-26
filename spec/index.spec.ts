// import { CitrusAd } from '../src/CitrusAd';
declare var CitrusAd;

const DEV_ENDPOINT = 'https://staging-integration.citrusad.com/v1';

describe('Test suit for CitrusAd JS Library', () => {

  const TEAM_ID = 'd9fb0607-6f5b-4468-8c1b-89bbcc9a5e65';
  const RANDOM_AD_ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  describe('can report', () => {
    let citrusAd: any = null;
    beforeEach(() => {
      citrusAd = CitrusAd.init(DEV_ENDPOINT);
    });

    it('impression', () => {
      return citrusAd.reportImpression(RANDOM_AD_ID, TEAM_ID);
    });

    it('click', () => {
      return citrusAd.reportClick(RANDOM_AD_ID, TEAM_ID);
    });

  });

});
