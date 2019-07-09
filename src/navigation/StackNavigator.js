import { createAppContainer, createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import Filters from '../screens/Filters';
import QuakeInfo from '../screens/QuakeInfo';
import Notifications from '../screens/Notifications';
import colors from '../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      TabNavigator,
      Filters,
      QuakeInfo,
      Notifications
    },
    {
      defaultNavigationOptions: {
        title: 'QuakeTrack',
        headerStyle: {
          backgroundColor: colors.header
        },
        headerTitleStyle: {
          fontSize: 28
        }
      },
      headerLayoutPreset: 'center'
    }
  )
);

export default StackNavigator;
