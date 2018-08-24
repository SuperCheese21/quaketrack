import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';

import styles from '../config/styles';

export default class SettingsSwitch extends Component {
    render() {
        return (
            <View style={styles.settingsItem}>
                <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                    {this.props.label}
                </Text>

                <Switch
                    value={this.props.value}
                    onValueChange={this.props.onValueChange} />
            </View>
        )
    }
}
