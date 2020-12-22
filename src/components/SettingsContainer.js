import React from 'react';
import { View } from 'react-native';

import colors from '../config/colors.json';

const SettingsContainer = ({ children }) => {
  const styles = {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  };

  return <View style={styles}>{children}</View>;
};

export default SettingsContainer;
