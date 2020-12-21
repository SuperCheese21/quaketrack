import {
  getCurrentPositionAsync,
  getPermissionsAsync as getLocationPermissions,
  requestPermissionsAsync as requestLocationPermissions,
} from 'expo-location';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync as getNotificationPermissions,
  requestPermissionsAsync as requestNotificationPermissions,
  setNotificationChannelAsync,
} from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

import { NOTIFICATION_CHANNELS } from '../config/constants';
import { usePermissionStatus } from '../lib/util/usePermissionStatus';

export const createNotificationChannelsAndroid = () =>
  Promise.all(
    NOTIFICATION_CHANNELS.map(({ id, ...rest }) =>
      setNotificationChannelAsync(id, rest),
    ),
  );

export const useLocation = initialValue => {
  const [location, setLocation] = useState(initialValue);
  const status = usePermissionStatus({
    getPermissions: getLocationPermissions,
    requestPermissions: requestLocationPermissions,
  });
  const getLocation = useCallback(async () => {
    if (status === 'granted') {
      const currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    }
  }, [status]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return location;
};

export const usePushToken = initialValue => {
  const [expoPushToken, setExpoPushToken] = useState(initialValue);
  const status = usePermissionStatus({
    getPermissions: getNotificationPermissions,
    requestPermissions: requestNotificationPermissions,
  });
  const getExpoPushToken = useCallback(async () => {
    if (status === 'granted') {
      const token = await getExpoPushTokenAsync();
      setExpoPushToken(token);
    }
  }, [status]);
  useEffect(() => {
    getExpoPushToken();
  }, [getExpoPushToken]);
  return expoPushToken;
};
