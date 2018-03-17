import moment from 'moment';
import { SET_QUERY_OPTIONS } from './actions';

const initialState = {
    'type': 'database',
    'database': {
        'minmagnitude': 2.5,
        'latitude': null,
        'longitude': null,
        'maxradiuskm': 20001.6,
        'limit': 100,
        'starttime': moment().subtract(30, 'days').format('YYYY-MM-DD'),
        'endtime': moment().format('YYYY-MM-DD'),
        'dateEnabled': false,
        'locationEnabled': false
    },
    'feed': {
        'mag': 2.5,
        'time': 'week'
    }
};

function updateSettings(state = initialState, action) {
    switch (action.type) {
        case SET_QUERY_OPTIONS:
            return Object.assign({}, state, {
                database: action.queryOptions
            });
        default:
            return state;
    }
    return state;
}
