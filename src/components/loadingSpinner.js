import React, { PureComponent } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';

import styles from '../config/styles';

export default class LoadingSpinner extends PureComponent {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        )
    }
}
