import settings from '../config/settings';

import qs from 'qs';

const getInfo = {

    async getJson(url) {
        try {
            let res = await fetch(url);
            let json = await res.json();

            return json;
        } catch (err) {
            console.error('Error: ' + err);
        }
    },

    buildURL(type, options) {
        const str = qs.stringify(options);
        var url = '';

        if (type == 'database')
            url = settings.DATABASE_API_URL + '?' + str;
        else if (type == 'feed')
            url = settings.FEED_API_URL + options.mag + '_' + options.time + '.geojson';

        return this.getJson(url);
    }

}

export default getInfo;
