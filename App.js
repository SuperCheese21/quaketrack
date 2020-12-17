import React, { useCallback, useEffect, useState } from 'react';

import fetchData from './src/api/fetchData';
import { getFirebaseUsername, initNotifications } from './src/api/firebase';
import defaultFilters from './src/config/options.json';
import StackNavigatorContainer from './src/navigation/StackNavigator';

const App = () => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(null);

  const updateData = useCallback(async () => {
    const json = await fetchData(filters);
    setIsLoading(false);
    setData(json);
  }, [filters]);

  const initData = useCallback(async () => {
    await updateData();
    const username = await getFirebaseUsername();
    await initNotifications(username);
    setUid(username);
  }, [updateData]);

  useEffect(() => {
    initData();
  }, [initData]);

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
