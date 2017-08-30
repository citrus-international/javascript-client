import { CitrusAd } from '../src/CitrusAd';

const DEV_ENDPOINT = 'https://dev-integration.citrusad.com/v1';
// tslint:disable-next-line max-line-length
const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkOWZiMDYwNy02ZjViLTQ0NjgtOGMxYi04OWJiY2M5YTVlNjUiLCJhdWQiOiJpbnRlZ3JhdGlvbi5jaXRydXNhZC5jb20iLCJleHAiOiIxNTAzMzcyNzAzMjk5IiwiaWF0IjoiMTUwMzM3MzYwMzI5OSIsInJvbGUiOiJiYWNrZW5kIn0.I48bcahJtPzzOsq7IaRcOVeO27v0xJk2VWpXhGNcZQ1fJ6R_E1K79ZFVfqd0KZi0bWQkcoiQiMjUXxhQ7qmEIA';

describe('Test suit for CitrusAd JS Library', function () {

  const TEAM_ID = 'd9fb0607-6f5b-4468-8c1b-89bbcc9a5e65';
  const RANDOM_AD_ID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  describe('valid JWT', () => {
    const validJWTProvider = () => {
      return Promise.resolve(JWT);
    };
    let citrusAd: CitrusAd = null;
    beforeEach(() => {
      citrusAd = CitrusAd.init(validJWTProvider, DEV_ENDPOINT);
    });
    it('registers an impression', () => {
      return citrusAd.reportImpression(RANDOM_AD_ID, TEAM_ID);
    });

    it('register a click', () => {
      return citrusAd.reportClick(RANDOM_AD_ID, TEAM_ID);
    });
  });

});
