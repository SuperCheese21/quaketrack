import React from 'react';
import { View } from 'react-native';

import colors from '../config/colors.json';

const SettingsContainer = ({ children }) => (
  <View style={styles.settingsContainer}>{children}</View>
);

const styles = {
  settingsContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
};

export default SettingsContainer;
