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

export default class Notifications extends PureComponent {
  state = {
    isLoading: true,
    settings: {},
  };

  static navigationOptions = {
    title: 'Notifications',
  };

  async componentDidMount() {
    const { uid } = this.props.screenProps;
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
    const settings = {
      ...this.state.settings,
      [property]: value,
    };
    this.setState({ settings });
  };

  onSaveAndClose = async () => {
    const {
      navigation,
      screenProps: { uid },
    } = this.props;
    this.setState({ isLoading: true });
    await updateNotificationSettings(uid, this.state.settings);
    this.setState({ isLoading: false });
    navigation.goBack();
  };

  render() {
    if (this.state.isLoading) {
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
            onPress={() => this.props.navigation.goBack()}
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

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2,
  },
};
