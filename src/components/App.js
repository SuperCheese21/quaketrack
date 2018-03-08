import { StackNavigator } from 'react-navigation';

import QuakesList from './QuakesList';
import QuakeInfo from './QuakeInfo';
import Settings from './Settings';
import defaultOptions from '../config/options';

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
        options: defaultOptions
    }
});

export default App;
