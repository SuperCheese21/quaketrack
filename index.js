import { AppRegistry } from 'react-native';
import App from './src/components/App';

AppRegistry.registerComponent('quaketrack', () => App);
AppRegistry.registerHeadlessTask('backgroundTask', () => require('./src/lib/backgroundTask'));
