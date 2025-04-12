import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { Alert } from 'react-native';

import firebaseConfig from '../config/firebase.json';

initializeApp(firebaseConfig);
const db = getDatabase();
const usersRef = ref(db, 'users');

const getKeyFromExpoPushToken = expoPushToken =>
  expoPushToken.split('ExponentPushToken[')[1].split(']')[0];

export const getUserData = async expoPushToken => {
  try {
    const expoPushTokenKey = getKeyFromExpoPushToken(expoPushToken);
    const snapshot = await get(child(usersRef, expoPushTokenKey));
    return snapshot?.val() ?? {};
  } catch (err) {
    Alert.alert('Error', 'Unable to fetch notification settings');
    return null;
  }
};

export const updateUserData = async (expoPushToken, data) => {
  try {
    const expoPushTokenKey = getKeyFromExpoPushToken(expoPushToken);
    await update(child(usersRef, expoPushTokenKey), {
      ...data,
      updated: dayjs().valueOf(),
    });
    return true;
  } catch (err) {
    Alert.alert('Error', 'Unable to update notification settings');
    return false;
  }
};

export const initNotifications = async ({ expoPushToken, location }) => {
  const userData = await getUserData(expoPushToken);
  if (userData === null) {
    return null;
  }
  const newSettings = {
    notifications: userData.notifications ?? false,
    minMagnitude: userData.minMagnitude ?? 5,
    updates: userData.updates ?? false,
  };
  await updateUserData(expoPushToken, {
    ...newSettings,
    location,
  });
  return newSettings;
};
