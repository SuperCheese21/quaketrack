import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import {
  getNotificationSettings,
  updateNotificationSettings,
} from '../api/firebase';
import LoadingSpinner from '../components/LoadingSpinner';
import { QuakesContext } from '../components/QuakesProvider';
import SettingsContainer from '../components/SettingsContainer';
import SettingsItem from '../components/SettingsItem';
import Slider from '../components/Slider';
import colors from '../config/colors.json';

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2,
  },
};

const Notifications = ({ navigation }) => {
  const { uid } = useContext(QuakesContext);

  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(async () => {
    try {
      const { notifications, minMagnitude, updates } =
        await getNotificationSettings(uid);
      setSettings({
        notifications,
        minMagnitude,
        updates,
      });
    } catch (err) {
      console.log(err);
      navigation.goBack();
    }
    setIsLoading(false);
  }, [navigation, uid]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = (property, value) =>
    setSettings(oldSettings => ({
      ...oldSettings,
      [property]: value,
    }));

  const onSaveAndClose = async () => {
    setIsLoading(true);
    const isUpdateSuccessful = await updateNotificationSettings({
      uid,
      settings,
    });
    setIsLoading(false);
    if (isUpdateSuccessful) {
      navigation.goBack();
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SettingsContainer>
      <SettingsItem label="Notifications">
        <Switch
          value={settings.notifications}
          onValueChange={value => updateSettings('notifications', value)}
          color={colors.accent}
        />
      </SettingsItem>

      <SettingsItem
        label="Minimum Magnitude"
        disabled={!settings.notifications}
      >
        <Text style={styles.settingsSliderValue}>{settings.minMagnitude}</Text>
      </SettingsItem>

      <Slider
        disabled={!settings.notifications}
        label="Minimum Magnitude"
        minimumValue={2}
        maximumValue={8}
        step={0.5}
        value={settings.minMagnitude}
        onValueChange={value => updateSettings('minMagnitude', value)}
      />

      <SettingsItem label="Updates" disabled={!settings.notifications}>
        <Switch
          value={settings.updates}
          onValueChange={value => updateSettings('updates', value)}
          color={colors.accent}
          disabled={!settings.notifications}
        />
      </SettingsItem>

      <SettingsItem style={{ height: 'auto', justifyContent: 'space-around' }}>
        <Button
          mode="contained"
          color="red"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button mode="contained" color={colors.accent} onPress={onSaveAndClose}>
          Save & Close
        </Button>
      </SettingsItem>
    </SettingsContainer>
  );
};

export default Notifications;
