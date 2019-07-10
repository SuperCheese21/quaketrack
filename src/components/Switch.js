import React from 'react';
import { Switch, Text, View } from 'react-native';

import styles from '../config/styles';

const SettingsSwitch = props => (
  <View style={styles.settingsItem}>
    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
      {props.label}
    </Text>

    <Switch value={props.value} onValueChange={props.onValueChange} />
  </View>
);

export default SettingsSwitch;
