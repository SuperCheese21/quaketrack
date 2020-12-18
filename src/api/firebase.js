import dayjs from 'dayjs';
import * as firebase from 'firebase';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { createNotificationChannelsAndroid } from './expo';
import firebaseConfig from '../config/firebase.json';

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const usersRef = firebase.database().ref('users');

export const useFirebaseUsername = initialValue => {
  const [uid, setUid] = useState(initialValue);
  const initFirebase = useCallback(async () => {
    const username = await new Promise((resolve, reject) => {
      auth.signInAnonymously().catch(err => reject(err.message));
      auth.onAuthStateChanged(user => user && resolve(user.uid));
    });
    setUid(username);
  }, []);
  useEffect(() => {
    initFirebase();
  }, [initFirebase]);
  return uid;
};

export const getNotificationSettings = async uid => {
  const snapshot = await usersRef.once('value');
  return snapshot.child(uid).val();
};

export const updateNotificationSettings = ({ uid, settings }) =>
  usersRef.child(uid).update(settings);

export const initNotifications = async ({ expoPushToken, location, uid }) => {
  if (Platform.OS === 'android') {
    await createNotificationChannelsAndroid();
  }

  const data = (await getNotificationSettings(uid)) || {};
  const settings = {
    minMagnitude: data.minMagnitude || 5,
    notifications: data.notifications || true,
    updates: data.updates || false,
    expoPushToken,
    location,
    updated: dayjs().format(),
  };

  await updateNotificationSettings({ uid, settings });
};
