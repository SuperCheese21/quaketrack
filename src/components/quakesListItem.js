import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import colorUtil from '../lib/colorUtil';
import formatTime from '../lib/formatTime';
import styles from './styles.js';

class QuakesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.properties,
            color: colorUtil.getRGB(this.props.data.properties.mag, 1.0, 9.5)
        };
    }

    render() {
        return(
            <TouchableOpacity
                style={[styles.listItem, {
                    backgroundColor: colorUtil.formatRGB(this.state.color)
                }]}
                onPress={() => this.props.navigation.navigate('QuakeInfo', {
                    'color': this.state.color,
                    'url': this.state.data.detail
                })}
                activeOpacity={0.6}
            >
                <View style={{width: 55, marginRight: 5}}>
                    <Text style={styles.magnitudeText}>
                        {this.state.data.mag}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.locationText}>
                        {this.state.data.place}
                    </Text>
                    <Text style={styles.timestampText}>
                        {formatTime(this.state.data.time)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default QuakesListItem;
