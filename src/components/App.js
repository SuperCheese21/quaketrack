import { StackNavigator } from 'react-navigation';

import QuakesList from './QuakesList';
import QuakeInfo from './QuakeInfo';
import Settings from './Settings';

const App = StackNavigator({
    QuakesList: {
        screen: QuakesList
    },
    QuakeInfo: {
        screen: QuakeInfo
    },
    Settings: {
        screen: Settings
    }
}, {
    initialRouteName: 'QuakesList',
    initialRouteParams: {
        type: 'feed',
        options: {
            database: {
                'format': 'geojson',
                'orderby': 'time',
                'minmagnitude': '7.5',
                'starttime': '1998-04-06 00:00:00'
            },
            feed: {
                'mag': '2.5',
                'time': 'week'
            }
        }
    }
});

export default App;
