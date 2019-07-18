import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import colors from '../config/colors.json';

const LoadingSpinner = () => (
  <View style={styles.loadingSpinner}>
    <ActivityIndicator animating color={colors.accent} size="large" />
  </View>
);

const styles = {
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default LoadingSpinner;
