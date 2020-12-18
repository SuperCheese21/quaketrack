import {
  getCurrentPositionAsync,
  getPermissionsAsync as getLocationPermissions,
  requestPermissionsAsync as requestLocationPermissions,
} from 'expo-location';
import {
  getExpoPushTokenAsync,
  getPermissionsAsync as getNotificationPermissions,
  requestPermissionsAsync as requestNotificationPermissions,
} from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';

const usePermissionStatus = ({ getPermissions, requestPermissions }) => {
  const [status, setStatus] = useState(null);
  const initPermissions = useCallback(async () => {
    const { status: existingStatus } = await getPermissions();
    if (existingStatus === 'granted') {
      setStatus(existingStatus);
      return;
    }
    const { status: newStatus } = await requestPermissions();
    setStatus(newStatus);
  }, [getPermissions, requestPermissions]);
  useEffect(() => {
    initPermissions();
  }, [initPermissions]);
  return status;
};

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
