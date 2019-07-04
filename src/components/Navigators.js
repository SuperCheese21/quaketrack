import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import Filters from './Filters';
import QuakesList from './QuakesList';
import QuakesMap from './QuakesMap';
import QuakeInfo from './QuakeInfo';
import Notifications from './Notifications';

import colors from '../config/colors.json';

const StackNavigator = createStackNavigator({
  TabNavigator: TabNavigator,
  QuakeInfo: QuakeInfo,
  Notifications: Notifications
});

const TabNavigator = createBottomTabNavigator({
  QuakesList: QuakesList,
  QuakesMap: QuakesMap
});

export default StackNavigator;
