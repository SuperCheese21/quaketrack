import { Platform } from 'react-native';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import firebaseConfig from '../config/firebaseConfig.json';

/**
 * [getFirebaseUsername description]
 * @return {[type]} [description]
 */
export function getFirebaseUsername() {
  return new Promise((resolve, reject) => {
    // Initialize firebase app
    firebase.initializeApp(firebaseConfig);

    // Sign in to firebase anonymously
    // TODO: Add google auth
    const auth = firebase.auth();
    auth.signInAnonymously().catch(err => {
      reject(err.message);
    });
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user.uid);
      }
    });
  });
}

/**
 * [getNotificationSettings description]
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
export async function getNotificationSettings(uid) {
  try {
    // Get user's notification settings from firebase
    const ref = firebase.database().ref('users');
    const snapshot = await ref.once('value');
    let notificationSettings = snapshot.child(uid);

    // If user is not in database, add user to database with default settings
    if (!notificationSettings) {
      notificationSettings = await updateNotificationSettings(uid, {
        minMagnitude: 5,
        notifications: true
      });
    }

    // return notification settings
    return notificationSettings;
  } catch (e) {
    console.error(e);
  }
}

/**
 * [registerForPushNotificationsAsync description]
 * @param  {[type]} uid [description]
 */
export async function updateNotificationSettings(uid, notificationSettings) {
  const token = await getPushToken();
  const location = await getLocation();

  const newSettings = {
    expoPushToken: token,
    minMagnitude: notificationSettings.minMagnitude,
    notifications: notificationSettings.notifications,
    location: {
      coords: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      accuracy: location.coords.accuracy,
      mocked: location.mocked
    },
    updated: location.timestamp
  };

  await firebase
    .database()
    .ref('users')
    .child(uid)
    .update(newSettings);

  return newSettings;
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

  return await Notifications.getExpoPushTokenAsync();
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

    return await Location.getCurrentPositionAsync({});
  }
}
