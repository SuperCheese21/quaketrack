import qs from 'qs';

import constants from '../config/constants.json';

/**
 * [fetchData description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function getUrl(options) {
  const query = {
    minmagnitude: options.minmagnitude,
    limit: options.limit,
    starttime: options.dateEnabled ? options.starttime : null,
    endtime: options.dateEnabled ? options.endtime : null,
    orderby: options.orderby,
    format: 'geojson'
  };

  const url = constants.urls.usgs.DATABASE + _queryStringify(query);

  return url;
}

/**
 * [queryStringify description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
function _queryStringify(query) {
  return qs.stringify(query, {
    addQueryPrefix: true,
    skipNulls: true
  });
}
