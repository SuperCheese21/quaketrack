import {
  getCurrentPositionAsync,
  getPermissionsAsync as getLocationPermissions,
  requestPermissionsAsync as requestLocationPermissions,
} from 'expo-location';
import {
  createChannelAndroidAsync,
  getExpoPushTokenAsync,
  getPermissionsAsync as getNotificationPermissions,
  requestPermissionsAsync as requestNotificationPermissions,
} from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

import { notificationChannels } from '../config/constants.json';
import { usePermissionStatus } from '../lib/util/usePermissionStatus';

export const createNotificationChannelsAndroid = () =>
  Promise.all(
    notificationChannels.map(({ id, ...rest }) =>
      createChannelAndroidAsync(id, rest),
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
