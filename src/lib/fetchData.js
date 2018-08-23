import settings from '../config/settings';

import qs from 'qs';

export default function fetchData(options) {
    const params = {
        minmagnitude: options.minmagnitude,
        limit: options.limit,
        starttime: options.dateEnabled ? options.starttime : '',
        endtime: options.dateEnabled ? options.endtime : '',
        orderby: options.orderby,
        format: 'geojson'
    };

    const url = settings.DATABASE_API_URL + '?' + qs.stringify(params);

    return _getJson(url);
}

async function _getJson(url) {
    try {
        let res = await fetch(url);
        let json = await res.json();

        return json;
    } catch (e) {
        console.error('Error: ' + e);
    }
}
