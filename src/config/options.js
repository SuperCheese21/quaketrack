const queryOptions = {
    database: {
        type: 'database',
        query: {
            'format': 'geojson',
            'orderby': 'time',
            'minmagnitude': '2.5',
            'starttime': '2000-01-01 00:00:00'
        }
    },
    feed: {
        type: 'feed',
        query: {
            'mag': '2.5',
            'time': 'week'
        }
    }
};

export default queryOptions;
