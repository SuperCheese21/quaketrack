import { isDevice } from 'expo-device';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync,
} from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { EXPERIENCE_ID, NOTIFICATION_CHANNELS } from '../config/constants';

export const createNotificationChannelsAndroid = () =>
  Promise.all(
    NOTIFICATION_CHANNELS.map(({ id, ...rest }) =>
      setNotificationChannelAsync(id, rest),
    ),
  );

export const registerForPushNotificationsAsync = async () => {
  try {
    if (Platform.OS === 'android') {
      await createNotificationChannelsAndroid();
    }
    if (!isDevice) {
      Alert.alert('Error', 'Must use physical device for Push Notifications');
      return null;
    }
    const { status: existingStatus } = await getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Error', 'Failed to get push token for push notification!');
      return null;
    }
    return (await getExpoPushTokenAsync({ experienceId: EXPERIENCE_ID })).data;
  } catch (err) {
    Alert.alert(
      'Error',
      'Unable to register for push notifications. Please try again later.',
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
