import dayjs from 'dayjs';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import firebaseConfig from '../config/firebase.json';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const usersRef = ref(db, 'users');

export const useFirebaseUsername = () => {
  const [uid, setUid] = useState(null);
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

export const getUserData = async uid => {
  try {
    const snapshot = await get(child(usersRef, uid));
    return snapshot?.val() ?? {};
  } catch (err) {
    Alert.alert('Error', 'Unable to fetch notification settings');
    return null;
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await update(child(usersRef, uid), {
      ...data,
      updated: dayjs().valueOf(),
    });
    return true;
  } catch (err) {
    Alert.alert('Error', 'Unable to update notification settings');
    return false;
  }
};

export const initNotifications = async ({ expoPushToken, location, uid }) => {
  const userData = await getUserData(uid);
  if (userData === null) {
    return null;
  }
  const newSettings = {
    notifications: userData.notifications ?? false,
    minMagnitude: userData.minMagnitude ?? 5,
    updates: userData.updates ?? false,
  };
  await updateUserData(uid, {
    ...newSettings,
    expoPushToken,
    location,
  });
  return newSettings;
};
