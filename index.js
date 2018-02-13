import { AppRegistry } from 'react-native';
import App from './src/components/App';
import BackgroundFetch from 'react-native-background-fetch';

let BackgroundTask = async (event) => {
    console.log('- BackgroundFetch HeadlessTask start');
    // Important:  await asychronous tasks when using HeadlessJS.
    await doAction();
    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish();
    console.log('- BackgroundFetch HeadlessTask finished');
}

// Simulate a long-running task (eg: HTTP request)
function doAction() {
    let timeout = 5000;
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('*** TIMEOUT ***');
            resolve();
        }, timeout);
    });
}

AppRegistry.registerComponent('quaketrack', () => App);
AppRegistry.registerHeadlessTask('BackgroundFetch', () => BackgroundTask);
