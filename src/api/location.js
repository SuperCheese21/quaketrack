import {
  getCurrentPositionAsync,
  useForegroundPermissions as useForegroundLocationPermissions,
} from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [status, requestPermission] = useForegroundLocationPermissions();
  const getLocation = useCallback(async () => {
    if (status?.granted) {
      const currentLocation = await getCurrentPositionAsync();
      setLocation(currentLocation);
    } else {
      await requestPermission();
    }
  }, [requestPermission, status?.granted]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return location;
};
