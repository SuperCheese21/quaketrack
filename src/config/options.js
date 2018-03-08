const defaultOptions = {
    feed: {
        'mag': '2.5',
        'time': 'week'
    },
    database: {
        'format': 'geojson',
        'orderby': 'time',
        'minmagnitude': '5',
        'starttime': '1900-01-01 00:00:00',
        'limit': 100
    }
}

export default defaultOptions;
