import React, { PureComponent } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';

import styles from './styles';

class LoadingSpinner extends PureComponent {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

export default LoadingSpinner;
