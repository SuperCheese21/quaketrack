import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { NOTIFICATION_CHANNELS } from '../config/constants';

const createNotificationChannelsAndroid = () =>
  Promise.all(
    NOTIFICATION_CHANNELS.map(({ id, ...rest }) =>
      setNotificationChannelAsync(id, rest),
    ),
  );

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await createNotificationChannelsAndroid();
  }
  if (isDevice) {
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Unable to register for push notifications',
        'Permission not granted to get push token for push notification!',
      );
      return null;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      Alert.alert(
        'Unable to register for push notifications',
        'Project ID not found',
      );
    }
    try {
      return (await getExpoPushTokenAsync({ projectId })).data;
    } catch (e) {
      Alert.alert('Unable to register for push notifications', `${e}`);
      return null;
    }
  } else {
    Alert.alert(
      'Unable to register for push notifications',
      'Must use physical device for push notifications',
    );
    return null;
  }
};

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const getPushToken = useCallback(async () => {
    const token = await registerForPushNotificationsAsync();
    setExpoPushToken(token);
  }, []);
  useEffect(() => {
    getPushToken();
  }, [getPushToken]);
  return expoPushToken;
};
