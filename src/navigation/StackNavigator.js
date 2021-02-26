import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TabNavigator from './TabNavigator';
import { FilterIcon, NotificationIcon } from '../components/HeaderIcons';
import colors from '../config/colors.json';
import Filters from '../screens/Filters';
import Notifications from '../screens/Notifications';
import QuakeInfo from '../screens/QuakeInfo';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.header,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 28,
        },
      }}
    >
      <Stack.Screen
        name="QuakeTrack"
        component={TabNavigator}
        options={{
          headerLeft: ({ onPress, label, labelStyle }) => (
            <NotificationIcon
              onPress={onPress}
              label={label}
              labelStyle={labelStyle}
            />
          ),
          headerRight: ({ onPress, label, labelStyle }) => (
            <FilterIcon
              onPress={onPress}
              label={label}
              labelStyle={labelStyle}
            />
          ),
        }}
      />
      <Stack.Screen name="QuakeInfo" component={QuakeInfo} />
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  </NavigationContainer>
);
