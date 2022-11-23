import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';

import QuakesProvider from './src/components/QuakesProvider';
import StackNavigatorContainer from './src/navigation/StackNavigator';

const App = () => (
  <QuakesProvider>
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="dark" />
    <StackNavigatorContainer />
  </QuakesProvider>
);

// React Native bug - ignore warning on long timers
LogBox.ignoreLogs([
  'Setting a timer',
  'Your project is accessing the following APIs',
]);

export default App;
