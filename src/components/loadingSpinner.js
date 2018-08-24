import React, { PureComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';

import styles from '../config/styles';

export default const LoadingSpinner = () => (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#0000ff' />
    </View>
);
