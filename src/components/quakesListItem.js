import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colorUtil from '../lib/colorUtil';
import { formatTime, formatMagnitude } from '../lib/formatData';
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

                <View style={{width: 60}}>
                    <Text style={styles.magnitudeText}>
                        {formatMagnitude(data.properties.mag)}
                    </Text>
                </View>

                <View style={{flex: 1}}>

                    <View style={{flexDirection: 'row', flex: 1.5}}>
                        <Icon name="location-on" size={20} color="black" style={{textAlignVertical: "center"}} />
                        <Text style={styles.locationText}>
                            {data.properties.place}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Icon name="access-time" size={20} color="black" style={{textAlignVertical: "center"}} />
                        <Text style={styles.timestampText}>
                            {formatTime(data.properties.time)}
                        </Text>
                    </View>

                </View>

                <View style={{width: 25, justifyContent: 'center'}}>
                    <Icon name="chevron-right" size={30} color="white" />
                </View>

            </TouchableOpacity>
        )
    }
}

export default QuakesListItem;
