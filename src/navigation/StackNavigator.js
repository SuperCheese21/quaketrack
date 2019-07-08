import { createAppContainer, createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import Filters from '../components/Filters';
import QuakeInfo from '../components/QuakeInfo';
import colors from '../config/colors.json';

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      TabNavigator,
      Filters,
      QuakeInfo
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
