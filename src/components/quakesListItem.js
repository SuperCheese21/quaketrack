import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import colorUtil from '../lib/colorUtil';
import formatTime from '../lib/formatTime';
import styles from '../config/styles';

class QuakesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            color: colorUtil.getRGB(this.props.data.properties.mag, 1.0, 9.5)
        };
    }

    render() {
        const color = this.state.color;
        const data = this.state.data;

        return(
            <TouchableOpacity
                style={[styles.listItem, {
                    backgroundColor: colorUtil.formatRGB(color)
                }]}
                onPress={() => this.props.navigation.navigate('QuakeInfo', {
                    'color': color,
                    'data': data
                })}
                activeOpacity={0.5}>

                <View style={{width: 55, marginRight: 5}}>
                    <Text style={styles.magnitudeText}>
                        {data.properties.mag}
                    </Text>
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.locationText}>
                        {data.properties.place}
                    </Text>
                    <Text style={styles.timestampText}>
                        {formatTime(data.properties.time)}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

export default QuakesListItem;
