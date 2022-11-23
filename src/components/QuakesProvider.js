import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocation, usePushToken } from '../api/expo';
import fetchData from '../api/fetchData';
import { initNotifications, useFirebaseUsername } from '../api/firebase';
import { DEFAULT_FILTERS } from '../config/constants';

export const QuakesContext = createContext();

export default ({ children }) => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);

  const expoPushToken = usePushToken(null);
  const location = useLocation(null);
  const uid = useFirebaseUsername(null);

  useEffect(() => {
    if (!expoPushToken || !location || !uid) return;
    initNotifications({
      expoPushToken,
      location,
      uid,
    });
  }, [expoPushToken, location, uid]);

  const updateData = useCallback(async () => {
    const json = await fetchData(filters);
    setIsLoading(false);
    setData(json);
  }, [filters]);

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
      uid,
      onRefresh,
      filters,
      setFilters,
    }),
    [data, filters, isLoading, onRefresh, uid],
  );

  return (
    <QuakesContext.Provider value={value}>{children}</QuakesContext.Provider>
  );
};
