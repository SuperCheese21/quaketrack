import dayjs from 'dayjs';
import { createChannelAndroidAsync } from 'expo-notifications';
import * as firebase from 'firebase';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import firebaseConfig from '../config/firebase.json';

export const useFirebaseUsername = initialValue => {
  const [uid, setUid] = useState(initialValue);
  const initFirebase = useCallback(async () => {
    const username = await new Promise((resolve, reject) => {
      firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();
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
  const ref = firebase.database().ref('users');
  const snapshot = await ref.once('value');
  return snapshot.child(uid).val();
};

export const updateNotificationSettings = ({ uid, settings }) =>
  firebase.database().ref('users').child(uid).update(settings);

export const initNotifications = async ({ expoPushToken, location, uid }) => {
  if (!expoPushToken || !location || !uid) return;

  if (Platform.OS === 'android') {
    await createChannelAndroidAsync('quake-alerts', {
      name: 'Alerts',
      sound: true,
      priority: 'max',
      vibrate: true,
    });
    await createChannelAndroidAsync('quake-updates', {
      name: 'Updates',
      sound: false,
      priority: 'low',
      vibrate: false,
    });
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
