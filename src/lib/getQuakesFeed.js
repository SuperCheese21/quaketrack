import settings from '../config/settings';

import qs from 'qs';

function buildURL(type, options) {
    const str = qs.stringify(options);
    var url = '';

    if (type == 'database')
        url = settings.DATABASE_API_URL + '?' + str;
    else if (type == 'feed')
        url = settings.FEED_API_URL + options.mag + '_' + options.time + '.geojson';

    return url;
}

async function getJson(type, options) {
    const url = buildURL(type, options);

    try {
        let res = await fetch(url);
        let json = await res.json();
        return json;
    } catch (err) {
        console.error(err);
    }
}

export default getJson;
