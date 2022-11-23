import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { child, get, getDatabase, update, ref, set } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { createNotificationChannelsAndroid } from './expo';
import firebaseConfig from '../config/firebase.json';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const usersRef = ref(db, 'users');

export const useFirebaseUsername = initialValue => {
  const [uid, setUid] = useState(initialValue);
  const initFirebase = useCallback(async () => {
    const username = await new Promise((resolve, reject) => {
      signInAnonymously(auth).catch(err => reject(err.message));
      onAuthStateChanged(auth, user => user && resolve(user.uid));
    });
    setUid(username);
  }, []);
  useEffect(() => {
    initFirebase();
  }, [initFirebase]);
  return uid;
};

export const getNotificationSettings = async uid => {
  try {
    const snapshot = await get(child(usersRef, uid));
    if (!snapshot) {
      await set(child(usersRef, uid), null);
      return {};
    }
    return snapshot;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const updateNotificationSettings = async ({ uid, settings }) => {
  try {
    await update(child(usersRef, uid), settings);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const initNotifications = async ({ expoPushToken, location, uid }) => {
  if (Platform.OS === 'android') {
    await createNotificationChannelsAndroid();
  }

  const data = await getNotificationSettings(uid);
  const settings = {
    minMagnitude: data.minMagnitude || 5,
    notifications: data.notifications || true,
    updates: data.updates || false,
    expoPushToken,
    location,
    updated: dayjs().valueOf(),
  };

  await updateNotificationSettings({ uid, settings });
};
