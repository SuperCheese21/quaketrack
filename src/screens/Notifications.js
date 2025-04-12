import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import { updateUserData } from '../api/firebase';
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
  const { notificationSettings, expoPushToken, updateNotificationSettings } =
    useContext(QuakesContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSaveAndClose = async () => {
    setIsLoading(true);
    const isUpdateSuccessful = await updateUserData(
      expoPushToken,
      notificationSettings,
    );
    setIsLoading(false);
    if (isUpdateSuccessful) {
      navigation.goBack();
    }
  };

  if (notificationSettings === null || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SettingsContainer>
      <SettingsItem label="Notifications">
        <Switch
          value={notificationSettings.notifications}
          onValueChange={value =>
            updateNotificationSettings('notifications', value)
          }
          color={colors.accent}
        />
      </SettingsItem>

      <SettingsItem
        label="Minimum Magnitude"
        disabled={!notificationSettings.notifications}
      >
        <Text style={styles.settingsSliderValue}>
          {notificationSettings.minMagnitude}
        </Text>
      </SettingsItem>

      <Slider
        disabled={!notificationSettings.notifications}
        label="Minimum Magnitude"
        minimumValue={2}
        maximumValue={8}
        step={0.5}
        value={notificationSettings.minMagnitude}
        onValueChange={value =>
          updateNotificationSettings('minMagnitude', value)
        }
      />

      <SettingsItem
        label="Updates"
        disabled={!notificationSettings.notifications}
      >
        <Switch
          value={notificationSettings.updates}
          onValueChange={value => updateNotificationSettings('updates', value)}
          color={colors.accent}
          disabled={!notificationSettings.notifications}
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
