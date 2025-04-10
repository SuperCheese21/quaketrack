import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import QuakesProvider from './src/components/QuakesProvider';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => (
  <NavigationContainer>
    <QuakesProvider>
      <StatusBar style="dark" />
      <StackNavigator />
    </QuakesProvider>
  </NavigationContainer>
);

// React Native bug - ignore warning on long timers
LogBox.ignoreLogs([
  'Setting a timer',
  'Your project is accessing the following APIs',
]);

export default App;
