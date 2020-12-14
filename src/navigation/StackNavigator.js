import { createAppContainer, createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import QuakeInfo from '../screens/QuakeInfo';
import Filters from '../screens/Filters';
import Notifications from '../screens/Notifications';
import colors from '../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
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
    }
  )
);

export default StackNavigator;
