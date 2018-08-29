import Promise from 'bluebird';
import qs from 'qs';

import constants from '../../config/constants.json';

/**
 * [fetchData description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function fetchData(options) {
    const query = {
        minmagnitude: options.minmagnitude,
        limit: options.limit,
        starttime: options.dateEnabled ? options.starttime : null,
        endtime: options.dateEnabled ? options.endtime : null,
        orderby: options.orderby,
        format: 'geojson'
    };

    const url = constants.urls.usgs.DATABASE + _queryStringify(query);

    return getJson([url]);
}

/**
 * [getJson description]
 * @param       {[type]} url [description]
 * @return      {[type]}     [description]
 */
export async function getJson(urls) {
    try {
        return await Promise.all(urls.map(url => (
            fetch(url).then(res => res.json())
        )));
    } catch (err) {
        console.error(err);
    }
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
