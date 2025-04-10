import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import QuakesList from '../screens/QuakesList';
import QuakesMap from '../screens/QuakesMap';
import colors from '../config/colors.json';

const Tab = createBottomTabNavigator();

export default ({ navigation: stackNavigation }) => (
  <Tab.Navigator
    shifting
    activeColor="blue"
    inactiveColor="black"
    barStyle={{ backgroundColor: colors.header }}
    lazy={false}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="List"
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={20}
            color={color}
          />
        ),
      }}
    >
      {() => <QuakesList stackNavigation={stackNavigation} />}
    </Tab.Screen>
    <Tab.Screen
      name="Map"
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker" size={20} color={color} />
        ),
      }}
    >
      {() => <QuakesMap stackNavigation={stackNavigation} />}
    </Tab.Screen>
  </Tab.Navigator>
);
