function buildURL(options) {
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";

    url += options.mag + "_" + options.time + ".geojson";

    return url;
}

async function getJson(options) {
    let url = buildURL(options);

    try {
        let res = await fetch(url);
        let json = await res.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export default getJson;
