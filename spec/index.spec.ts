import { CitrusAd } from '../src/CitrusAd';

const DEV_ENDPOINT = 'https://dev-integration.citrusad.com/v1';

describe('Test suit for CitrusAd JS Library', () => {

  const TEAM_ID = 'd9fb0607-6f5b-4468-8c1b-89bbcc9a5e65';
  const RANDOM_AD_ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  describe('can report', () => {
    let citrusAd: CitrusAd = null;
    beforeEach(() => {
      citrusAd = CitrusAd.init(false, DEV_ENDPOINT);
    });

    it('impression', () => {
      return citrusAd.reportImpression(RANDOM_AD_ID, TEAM_ID);
    });

    it('click', () => {
      return citrusAd.reportClick(RANDOM_AD_ID, TEAM_ID);
    });

  });

});
