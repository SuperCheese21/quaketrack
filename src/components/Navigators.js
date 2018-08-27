import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Filters from './Filters';
import QuakesList from './QuakesList';
import QuakesMap from './QuakesMap';
import QuakeInfo from './QuakeInfo';
import Settings from './Settings';

// Create stack navigator for list page
const ListStackNavigator = createStackNavigator({
    QuakesList: QuakesList,
    QuakeInfo: QuakeInfo,
    Filters: Filters
}, {
    initialRouteName: 'QuakesList',
    transitionConfig: {
        
    }
});

// Create stack navigator for map page
const MapStackNavigator = createStackNavigator({
    QuakesMap: QuakesMap,
    QuakeInfo: QuakeInfo,
    Filters: Filters
}, {
    initialRouteName: 'QuakesMap'
});

// Create top-level drawer navigator
const DrawerNavigator = createDrawerNavigator({
    List: ListStackNavigator,
    Map: MapStackNavigator,
    Settings: Settings
}, {
    drawerWidth: 250,
    initialRouteName: 'List'
});

export default DrawerNavigator;
