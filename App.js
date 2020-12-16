import React, { useCallback, useEffect, useState } from 'react';

import defaultFilters from './src/config/options.json';
import { getUrl } from './src/api/fetchData';
import { getFirebaseUsername, initNotifications } from './src/api/firebase';
import StackNavigatorContainer from './src/navigation/StackNavigator';

const App = () => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [uid, setUid] = useState(null);

  const updateData = useCallback(async () => {
    const url = getUrl(filters);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setIsLoading(false);
      setData(json);
    } catch (err) {
      console.error(err);
    }
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
