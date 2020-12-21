import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import colors from '../config/colors.json';

const LoadingSpinner = () => {
  const styles = {
    loadingSpinner: {
      flex: 1,
      justifyContent: 'center',
    },
  };
  return (
    <View style={styles.loadingSpinner}>
      <ActivityIndicator animating color={colors.accent} size="large" />
    </View>
  );
};

export default LoadingSpinner;
