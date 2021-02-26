import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import colors from '../config/colors.json';

const Tab = createMaterialBottomTabNavigator();

export default () => (
  <Tab.Navigator
    shifting
    activeColor="blue"
    inactiveColor="black"
    barStyle={{ backgroundColor: colors.header }}
    lazy={false}
  >
    <Tab.Screen name="List" component={QuakesList} />
    <Tab.Screen name="Map" component={QuakesMap} />
  </Tab.Navigator>
);
