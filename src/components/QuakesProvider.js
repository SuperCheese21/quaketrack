import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocation } from '../api/location';
import fetchData from '../api/fetchData';
import { initNotifications } from '../api/firebase';
import { usePushNotifications } from '../api/notifications';
import { DEFAULT_FILTERS } from '../config/constants';

export const QuakesContext = createContext();

export default ({ children }) => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [notificationSettings, setNotificationSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const expoPushToken = usePushNotifications();
  const location = useLocation();

  const fetchNotificationSettings = useCallback(async () => {
    if (!expoPushToken) return;
    const settings = await initNotifications({
      expoPushToken,
      location,
    });
    if (settings !== null) {
      setNotificationSettings(settings);
    }
  }, [expoPushToken, location]);

  const updateData = useCallback(async () => {
    const json = await fetchData(filters);
    setIsLoading(false);
    setData(json);
  }, [filters]);

  const updateNotificationSettings = (property, value) =>
    setNotificationSettings(oldSettings => ({
      ...oldSettings,
      [property]: value,
    }));

  useEffect(() => {
    fetchNotificationSettings();
  }, [fetchNotificationSettings]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    updateData();
  }, [updateData]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      expoPushToken,
      notificationSettings,
      updateNotificationSettings,
      onRefresh,
      filters,
      setFilters,
    }),
    [data, expoPushToken, filters, isLoading, notificationSettings, onRefresh],
  );

  return (
    <QuakesContext.Provider value={value}>{children}</QuakesContext.Provider>
  );
};
