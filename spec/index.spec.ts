import {CitrusAd} from '../src/CitrusAd';
import {ContextInformation} from '../src/generated/api';
import PageTypeEnum = ContextInformation.PageTypeEnum;

// This test needs a local integration service running with
// authentication filter disabled to work.
// TODO: Introduce mocks for ajax requests

describe('Test suit for CitrusAd JS Library', function () {

  const citrusAd = CitrusAd.init(
      payload => Promise.resolve('test'),
      'e-commerce-provider-id',
      'http://localhost:8080');

  it("registers an impression", done => {
    citrusAd.registerImpression("test").then(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it("register a click", done => {
    citrusAd.registerClick("test").then(result => {
      expect(result).toBe(true);
      done();
    });
  });

});