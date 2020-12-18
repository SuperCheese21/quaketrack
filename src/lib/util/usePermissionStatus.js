import { useCallback, useEffect, useState } from 'react';

export const usePermissionStatus = ({ getPermissions, requestPermissions }) => {
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
