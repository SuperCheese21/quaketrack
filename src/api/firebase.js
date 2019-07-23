import { Platform } from 'react-native';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import firebaseConfig from '../config/firebaseConfig.json';

/**
 * [initNotifications description]
 * @return {[type]} [description]
 */
export async function initNotifications(uid) {
  // Create new notification channel on Android device
  if (Platform.OS === 'android') {
    await Notifications.createChannelAndroidAsync('quake-alerts', {
      name: 'Alerts',
      sound: true,
      priority: 'max',
      vibrate: true
    });
    await Notifications.createChannelAndroidAsync('quake-updates', {
      name: 'Updates',
      sound: false,
      priority: 'low',
      vibrate: false
    });
  }

  // Get user's notification settings from database
  const data = (await getNotificationSettings(uid)) || {};

  // Get user's location and expo push token
  const token = await getPushToken();
  const location = await getLocation();

  // Update notification settings in database
  const notificationSettings = {
    minMagnitude: data.minMagnitude || 5,
    notifications: data.notifications || true,
    updates: data.updates || false,
    expoPushToken: token,
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
  await updateNotificationSettings(uid, notificationSettings);

  // Return notification settings from database
  return notificationSettings;
}

/**
 * [getNotificationSettings description]
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
export async function getNotificationSettings(uid) {
  // Get user's notification settings from firebase
  const ref = firebase.database().ref('users');
  const snapshot = await ref.once('value');
  return snapshot.child(uid).val();
}

/**
 * [registerForPushNotificationsAsync description]
 * @param  {[type]} uid [description]
 */
export async function updateNotificationSettings(uid, settings) {
  await firebase
    .database()
    .ref('users')
    .child(uid)
    .update(settings);
}

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

    return await Location.getCurrentPositionAsync({
      accuracy: 1,
      maximumAge: 3600000
    });
  }
}
