import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Button, Switch } from 'react-native-paper';

import LoadingSpinner from '../components/LoadingSpinner';
import SettingsContainer from '../components/SettingsContainer';
import SettingsItem from '../components/SettingsItem';
import SettingsItemLabel from '../components/SettingsItemLabel';
import Slider from '../components/Slider';
import {
  getNotificationSettings,
  updateNotificationSettings,
} from '../api/firebase';
import colors from '../config/colors.json';
import { QuakesContext } from '../components/QuakesProvider';

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2,
  },
};

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      settings: {},
    };
  }

  async componentDidMount() {
    const { uid } = this.context;
    const {
      notifications,
      minMagnitude,
      updates,
    } = await getNotificationSettings(uid);
    this.setState({
      settings: {
        notifications,
        minMagnitude,
        updates,
      },
      isLoading: false,
    });
  }

  updateSettings = (property, value) => {
    const { settings } = this.state;
    const newSettings = {
      ...settings,
      [property]: value,
    };
    this.setState({ settings: newSettings });
  };

  onSaveAndClose = async () => {
    const { navigation } = this.props;
    const { settings } = this.state;
    const { uid } = this.context;

    this.setState({ isLoading: true });
    await updateNotificationSettings(uid, settings);
    this.setState({ isLoading: false });

    navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return <LoadingSpinner />;
    }

    const { settings } = this.state;

    return (
      <SettingsContainer>
        <SettingsItem>
          <SettingsItemLabel text="Notifications" />
          <Switch
            value={settings.notifications}
            onValueChange={value => this.updateSettings('notifications', value)}
            color={colors.accent}
          />
        </SettingsItem>

        <SettingsItem disabled={!settings.notifications}>
          <SettingsItemLabel text="Minimum Magnitude" />
          <Text style={styles.settingsSliderValue}>
            {settings.minMagnitude}
          </Text>
        </SettingsItem>

        <Slider
          disabled={!settings.notifications}
          label="Minimum Magnitude"
          minimumValue={2}
          maximumValue={8}
          step={0.5}
          value={settings.minMagnitude}
          onValueChange={value => this.updateSettings('minMagnitude', value)}
        />

        <SettingsItem disabled={!settings.notifications}>
          <SettingsItemLabel text="Updates" />
          <Switch
            value={settings.updates}
            onValueChange={value => this.updateSettings('updates', value)}
            color={colors.accent}
          />
        </SettingsItem>

        <SettingsItem
          style={{ height: 'auto', justifyContent: 'space-around' }}
        >
          <Button
            mode="contained"
            color="red"
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            color={colors.accent}
            onPress={this.onSaveAndClose}
          >
            Save & Close
          </Button>
        </SettingsItem>
      </SettingsContainer>
    );
  }
}

Notifications.contextType = QuakesContext;

export default Notifications;
