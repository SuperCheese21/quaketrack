import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    <Tab.Screen
      name="List"
      component={QuakesList}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={20}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Map"
      component={QuakesMap}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker" size={20} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
