import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { FilterIcon, NotificationIcon } from '../components/HeaderIcons';
import QuakesList from '../components/QuakesList';
import QuakesMap from '../components/QuakesMap';
import Notifications from '../components/Notifications';
import colors from '../config/colors.json';

export default class TabNavigatorContainer extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NotificationIcon navigation={navigation} />,
    headerRight: <FilterIcon navigation={navigation} />
  });

  render() {
    return <TabNavigator screenProps={{ ...this.props.screenProps }} />;
  }
}

const TabNavigator = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      QuakesList,
      QuakesMap,
      Notifications
    },
    {
      shifting: true,
      activeColor: 'blue',
      inactiveColor: 'black',
      barStyle: {
        backgroundColor: colors.header
      }
    }
  )
);
