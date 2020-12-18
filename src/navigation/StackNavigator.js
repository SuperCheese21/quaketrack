import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TabNavigator from './TabNavigator';
import QuakeInfo from '../screens/QuakeInfo';
import Filters from '../screens/Filters';
import Notifications from '../screens/Notifications';
import colors from '../config/colors.json';

const StackNavigator = createStackNavigator(
  {
    TabNavigator,
    QuakeInfo,
    Filters,
    Notifications,
  },
  {
    defaultNavigationOptions: {
      title: 'QuakeTrack',
      headerStyle: {
        backgroundColor: colors.header,
      },
      headerTitleStyle: {
        fontSize: 28,
      },
    },
    headerLayoutPreset: 'center',
  },
);

export default createAppContainer(StackNavigator);
