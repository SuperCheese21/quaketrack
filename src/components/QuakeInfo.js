import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles.js';

class QuakeInfo extends Component {

    static navigationOptions = {
        title: 'Earthquake Info',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    render() {
        const { params } = this.props.navigation.state;

        return (
            <View style={{
                backgroundColor: params.color,
                flex: 1,
                borderRadius: 8,
                margin: 5,
                opacity: 0.5
            }}>

            </View>
        )
    }
}

export default QuakeInfo;
