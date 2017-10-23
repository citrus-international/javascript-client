import * as sinon from 'sinon';
import { CitrusAd } from '../src/CitrusAd';

describe('Test suit for CitrusAd JS Library', () => {

  describe('_executeAction', () => {

    let mockFailingAction: any;
    let citrusAd: CitrusAd = null;
    beforeEach(() => {
      mockFailingAction = sinon.stub().returns(Promise.reject({ status: 500 }));
      citrusAd = CitrusAd.init({ overrideApiAddress: 'https://endpoint' });
    });

    it('retries actions three times', (done) => {
      return citrusAd['_executeAction'](mockFailingAction, 0)
        .catch((error) => {
          sinon.assert.calledThrice(mockFailingAction);
          done();
        });
    });

  });

});
