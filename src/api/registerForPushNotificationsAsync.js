import { Platform } from 'react-native';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

/**
 * [registerForPushNotificationsAsync description]
 * @param  {[type]} uid [description]
 */
export default async function registerForPushNotificationsAsync(uid) {
  const token = await getPushToken();
  const location = await getLocation();

  firebase
    .database()
    .ref('users')
    .child(uid)
    .update({
      expoPushToken: token,
      minMagnitude: 5,
      notifications: true,
      location: {
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        },
        accuracy: location.coords.accuracy,
        mocked: location.mocked
      },
      updated: location.timestamp
    });
}

/**
 * [getPushToken description]
 * @return {[type]} [description]
 */
async function getPushToken() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
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
    const { status: existingStatus } = await Permissions.askAsync(
      Permissions.LOCATION
    );
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
