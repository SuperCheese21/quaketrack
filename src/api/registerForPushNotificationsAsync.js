import { Platform } from 'react-native';
import { Constants, Location, Notifications, Permissions } from 'expo';
import * as firebase from 'firebase';
import moment from 'moment';
import Promise from 'bluebird';

/**
 * [registerForPushNotificationsAsync description]
 * @param  {[type]} uid [description]
 */
export default async function registerForPushNotificationsAsync(uid) {
    Promise.all([getPushToken(), getLocation()])
        .then(res => {
            firebase.database().ref('users').child(uid).update({
                expoPushToken: res[0],
                minMagnitude: 5,
                notifications: true,
                location: {
                    coords: {
                        latitude: res[1].coords.latitude,
                        longitude: res[1].coords.longitude
                    },
                    accuracy: res[1].coords.accuracy,
                    mocked: res[1].mocked
                },
                updated: res[1].timestamp
            });
        })
        .catch(err => {
            console.error(err);
        });
}

/**
 * [getPushToken description]
 * @return {[type]} [description]
 */
async function getPushToken() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token;
}

/**
 * [getLocation description]
 * @return {[type]} [description]
 */
async function getLocation() {
    if (Platform.OS !== 'android' || Constants.isDevice) {
        const { status: existingStatus } = await Permissions.askAsync(Permissions.LOCATION);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        return location;
    }
}
