import React, { PureComponent } from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { FilterIcon, NotificationIcon } from '../components/HeaderIcons';
import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import colors from '../config/colors.json';

export default class TabNavigatorContainer extends PureComponent {
  static navigationOptions = ({ navigation: stackNavigation }) => ({
    headerLeft: <NotificationIcon stackNavigation={stackNavigation} />,
    headerRight: <FilterIcon stackNavigation={stackNavigation} />
  });

  render() {
    return (
      <TabNavigator
        screenProps={{
          stackNavigation: this.props.navigation,
          ...this.props.screenProps
        }}
      />
    );
  }
}

const TabNavigator = createAppContainer(
  createMaterialBottomTabNavigator(
    {
      QuakesList,
      QuakesMap
    },
    {
      shifting: true,
      activeColor: 'blue',
      inactiveColor: 'black',
      barStyle: {
        backgroundColor: colors.header
      },
      lazy: false
    }
  )
);
