import { Notifications, Permissions } from 'expo';
import * as firebase from 'firebase';
import moment from 'moment';

/**
 * [registerForPushNotificationsAsync description]
 * @param  {[type]} uid [description]
 */
export default async function registerForPushNotificationsAsync(uid) {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    firebase.database().ref('users').child(uid).update({
        expoPushToken: token,
        minMagnitude: 5,
        notifications: true,
        updated: Number(moment().format('x'))
    });
}
