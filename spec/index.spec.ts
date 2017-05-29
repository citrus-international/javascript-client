import {CitrusAd} from '../src/CitrusAd';
import {ContextInformation} from '../src/generated/api';
import PageTypeEnum = ContextInformation.PageTypeEnum;

describe('Test suit for CitrusAd JS Library', function () {

  // needs a local ad server to run

  const citrusAd = CitrusAd.init(payload => Promise.resolve('test'), 'e-commerce-provider-id',
      'http://localhost:8080');

  const contextInformation: ContextInformation = {
    userId: 'test-user-id',
    browserContext: {
      userAgent: 'test agent'
    },
    categoryHierarchy: 'bread/whole-meal/',
    currentCartItems: [],
    maxNumberOfAds: 3,
    pageType: PageTypeEnum.Search,
    substitutedProductGtin: '123332312',
    searchTerm: 'test'
  };

  it('runs', (done) => {
    citrusAd.requestAd(contextInformation).then(result => {
      expect(result.isSuccessful).toBe(true);
      done();
    });
  });
});