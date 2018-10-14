import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import Filters from './Filters';
import QuakesList from './QuakesList';
import QuakesMap from './QuakesMap';
import QuakeInfo from './QuakeInfo';
import Settings from './Settings';
import ShakeMap from './ShakeMap';

import colors from '../config/colors.json';

// Create stack navigator for list page
const ListStackNavigator = createStackNavigator({
    QuakesList: QuakesList,
    QuakeInfo: QuakeInfo,
    ShakeMap: ShakeMap,
    Filters: Filters
}, {
    initialRouteName: 'QuakesList',
    transitionConfig: getSlideFromRightTransition
});

// Create stack navigator for map page
const MapStackNavigator = createStackNavigator({
    QuakesMap: QuakesMap,
    QuakeInfo: QuakeInfo,
    ShakeMap: ShakeMap,
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
    initialRouteName: 'List',
    drawerBackgroundColor: colors.background,
    backBehavior: 'List'
});

export default DrawerNavigator;
