import { AppRegistry } from 'react-native';
import App from './src/components/App';

import { createStore } from 'redux';
import updateSettings from './src/redux/reducers';

AppRegistry.registerComponent('quaketrack', () => App);
