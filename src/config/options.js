const queryOptions = {
    database: {
        'format': 'geojson',
        'orderby': 'time',
        'minmagnitude': '4',
        'starttime': '2018-02-01 00:00:00'
    },
    feed: {
        'mag': '2.5',
        'time': 'week'
    }
};

export default queryOptions;
