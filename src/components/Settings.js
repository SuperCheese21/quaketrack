import React, { Component } from 'react';
import { View } from 'react-native';

import colors from '../config/colors';
import styles from '../config/styles';

class Settings extends Component {
    static navigationOptions = {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.background}}>
            </View>
        )
    }
}

export default Settings;
