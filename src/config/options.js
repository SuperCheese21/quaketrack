const queryOptions = {
    database: {
        'format': 'geojson',
        'orderby': 'time',
        'minmagnitude': '7',
        'starttime': '1998-04-06 00:00:00'
    },
    feed: {
        'mag': '1.0',
        'time': 'week'
    }
};

export default queryOptions;
