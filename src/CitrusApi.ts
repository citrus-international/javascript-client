/**
 * Citrus Integration API
 * Citrus Integration API
 *
 * OpenAPI spec version: 0.0.1
 *
 * This was originally generated by swagger codegen typescript-fetch
 * and then manually edited by JHM
 */

// tslint:disable max-line-length

import * as querystring from 'querystring';
import * as url from 'url';

import * as isomorphicFetch from 'isomorphic-fetch';
import * as assign from 'core-js/library/fn/object/assign';

interface Dictionary<T> { [index: string]: T; }
export type FetchAPI = (url: string, init?: any) => Promise<any>;

const BASE_PATH = 'https://integration.citrusad.com/v1'.replace(/\/+$/, '');

export interface FetchArgs {
  url: string;
  options: any;
}

export class BaseAPI {
  basePath: string;
  fetch: FetchAPI;

  constructor(fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) {
    this.basePath = basePath;
    this.fetch = fetch;
  }
}
export interface IReport {
  adId: string;
  cookies: boolean;
  bfp?: string;
  lsid?: string;
}
/**
 * DefaultApi - fetch parameter creator
 */
// tslint:disable variable-name
export const DefaultApiFetchParamCreator = {
  /**
   * Reports a click for an Ad  A Click should be reported whenever a user clicks on an Ad.  Similar to impressions, the Product Ad ID must be included in the path of the request along with the appropriate JWT.
   * @summary Report an Ad click
   * @param adId
   * @param teamId
   */
  reportClick(params: IReport, options?: any): FetchArgs {
    // verify required parameter "adId" is set
    if (params['adId'] == null) {
      throw new Error('Missing required parameter adId when calling reportClick');
    }


    if (params['cookies'] == null) {
      throw new Error('Missing required parameter cookies when calling reportClick');
    }

    const baseUrl = `/ads/{adId}/click`
      .replace(`{${'adId'}}`, `${params['adId']}`);
    const urlObj = url.parse(baseUrl, true);
    urlObj.query = assign({}, urlObj.query, {
      lsid: params['lsid'],
      bfp: params['bfp'],
      cookies: params['cookies'],
    });
    const fetchOptions: RequestInit = assign({}, { method: 'POST' }, options);

    const contentTypeHeader: Dictionary<string> = {};
    if (contentTypeHeader) {
      fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
    }
    return {
      url: url.format(urlObj),
      options: fetchOptions,
    };
  },
  /**
   * Reports an impression for an Ad  An impression should be reported whenever a user views an Ad.  When reporting an impression, the Product Ad ID that was provided when generating the ad must be included in the path of the request. As with other endpoints, the generated JWT must also be provided as authentication.
   * @summary Report an Ad impression
   * @param adId
   * @param teamId
   */
  reportImpression(params: IReport, options?: any): FetchArgs {
    // verify required parameter "adId" is set
    if (params['adId'] == null) {
      throw new Error('Missing required parameter adId when calling reportImpression');
    }


    if (params['cookies'] == null) {
      throw new Error('Missing required parameter cookies when calling reportImpression');
    }

    const baseUrl = `/ads/{adId}/impression`
      .replace(`{${'adId'}}`, `${params['adId']}`);
    const urlObj = url.parse(baseUrl, true);
    urlObj.query = assign({}, urlObj.query, {
      lsid: params['lsid'],
      bfp: params['bfp'],
      cookies: params['cookies'],
    });
    const fetchOptions: RequestInit = assign({}, { method: 'POST' }, options);

    const contentTypeHeader: Dictionary<string> = {};
    if (contentTypeHeader) {
      fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
    }
    return {
      url: url.format(urlObj),
      options: fetchOptions,
    };
  },
};

/**
 * DefaultApi - functional programming interface
 */
// tslint:disable variable-name
export const DefaultApiFp = {

  /**
   * Reports a click for an Ad  A Click should be reported whenever a user clicks on an Ad.  Similar to impressions, the Product Ad ID must be included in the path of the request along with the appropriate JWT.
   * @summary Report an Ad click
   * @param adId
   * @param teamId
   */
  reportClick(params: IReport, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
    const fetchArgs = DefaultApiFetchParamCreator.reportClick(params, options);
    return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
      return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
      });
    };
  },
  /**
   * Reports an impression for an Ad  An impression should be reported whenever a user views an Ad.  When reporting an impression, the Product Ad ID that was provided when generating the ad must be included in the path of the request. As with other endpoints, the generated JWT must also be provided as authentication.
   * @summary Report an Ad impression
   * @param adId
   * @param teamId
   */
  reportImpression(params: IReport, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
    const fetchArgs = DefaultApiFetchParamCreator.reportImpression(params, options);
    return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
      return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          throw response;
        }
      });
    };
  },
};

/**
 * DefaultApi - object-oriented interface
 */
export class DefaultApi extends BaseAPI {
  /**
   * Reports a click for an Ad  A Click should be reported whenever a user clicks on an Ad.  Similar to impressions, the Product Ad ID must be included in the path of the request along with the appropriate JWT.
   * @summary Report an Ad click
   * @param adId
   * @param teamId
   */
  reportClick(params: IReport, options?: any) {
    return DefaultApiFp.reportClick(params, options)(this.fetch, this.basePath);
  }
  /**
   * Reports an impression for an Ad  An impression should be reported whenever a user views an Ad.  When reporting an impression, the Product Ad ID that was provided when generating the ad must be included in the path of the request. As with other endpoints, the generated JWT must also be provided as authentication.
   * @summary Report an Ad impression
   * @param adId
   * @param teamId
   */
  reportImpression(params: IReport, options?: any) {
    return DefaultApiFp.reportImpression(params, options)(this.fetch, this.basePath);
  }

}

/**
 * DefaultApi - factory interface
 */
// tslint:disable variable-name
export const DefaultApiFactory = function (fetch?: FetchAPI, basePath?: string) {
  return {
    /**
     * Reports a click for an Ad  A Click should be reported whenever a user clicks on an Ad.  Similar to impressions, the Product Ad ID must be included in the path of the request along with the appropriate JWT.
     * @summary Report an Ad click
     * @param adId
     * @param teamId
     */
    reportClick(params: IReport, options?: any) {
      return DefaultApiFp.reportClick(params, options)(fetch, basePath);
    },
    /**
     * Reports an impression for an Ad  An impression should be reported whenever a user views an Ad.  When reporting an impression, the Product Ad ID that was provided when generating the ad must be included in the path of the request. As with other endpoints, the generated JWT must also be provided as authentication.
     * @summary Report an Ad impression
     * @param adId
     * @param teamId
     */
    reportImpression(params: IReport, options?: any) {
      return DefaultApiFp.reportImpression(params, options)(fetch, basePath);
    },
  };
};

