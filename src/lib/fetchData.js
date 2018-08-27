import qs from 'qs';

import settings from '../config/settings';

/**
 * [fetchData description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function fetchData(options) {
    const params = qs.stringify({
        minmagnitude: options.minmagnitude,
        limit: options.limit,
        starttime: options.dateEnabled ? options.starttime : '',
        endtime: options.dateEnabled ? options.endtime : '',
        orderby: options.orderby,
        format: 'geojson'
    });

    const url = settings.DATABASE_API_URL + '?' + params;

    return getJson(url);
}

/**
 * [getJson description]
 * @param       {[type]} url [description]
 * @return      {[type]}     [description]
 */
export async function getJson(url) {
    try {
        let res = await fetch(url);
        let json = await res.json();
        return json;
    } catch (err) {
        console.error(err);
    }
}
