import React, { useCallback, useEffect, useState } from 'react';

import { useLocation, usePushToken } from './src/api/expo';
import fetchData from './src/api/fetchData';
import { initNotifications, useFirebaseUsername } from './src/api/firebase';
import defaultFilters from './src/config/options.json';
import StackNavigatorContainer from './src/navigation/StackNavigator';

const App = () => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);

  const expoPushToken = usePushToken(null);
  const location = useLocation(null);
  const uid = useFirebaseUsername(null);

  useEffect(
    () =>
      initNotifications({
        expoPushToken,
        location,
        uid,
      }),
    [expoPushToken, location, uid],
  );

  const updateData = useCallback(async () => {
    const json = await fetchData(filters);
    setIsLoading(false);
    setData(json);
  }, [filters]);
  useEffect(updateData, [updateData]);

  const onRefresh = () => {
    setIsLoading(true);
    updateData();
  };

  return (
    <StackNavigatorContainer
      screenProps={{
        data,
        isLoading,
        uid,
        onRefresh,
        filters,
        setFilters,
      }}
    />
  );
};

export default App;
