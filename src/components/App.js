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
});

export default App;
