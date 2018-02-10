const querystring = require('querystring');
const options = {
    "format": "geojson",
    "endtime": "",
    "starttime": "",
    "latitude": null,
    "longitude": null,
    "maxradiuskm": 20001.6,
    "minmagnitude": null,
    "maxmagnitude": null,
    "offset": 1
};

function buildURL() {
    let optionsString = querystring.stringify(options);

    return "https://earthquake.usgs.gov/fdsnws/event/1/query?" + optionsString;
}

async function getQuakes(url) {
    try {
        let response = await fetch(url);
        let responseJson = await response.json();

        console.log(responseJson);

        return responseJson;
    } catch (e) {
        console.error(e);
    }
}
