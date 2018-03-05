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
    initialRouteName: 'QuakesList'
});

export default App;
