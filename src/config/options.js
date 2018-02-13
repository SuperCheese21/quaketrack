const queryOptions = {
    database: {
        type: 'database',
        query: {
            'format': 'geojson',
            'orderby': 'time',
            'minmagnitude': '4.5',
            'starttime': '2018-02-11 00:00:00'
        }
    },
    feed: {
        type: 'feed',
        query: {
            'mag': '4.5',
            'time': 'week'
        }
    }
};

export default queryOptions;
