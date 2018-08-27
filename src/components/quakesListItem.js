import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { formatRGB, getRGB } from '../lib/colorUtil';
import { formatTime, formatMagnitude } from '../lib/formatData';
import styles from '../config/styles';

export default class QuakesListItem extends PureComponent {
    render() {
        const data = this.props.data;
        const color = getRGB(data.properties.mag, 1.0, 9.5);

        return (
            <TouchableOpacity
                style={[styles.listItem, {
                    backgroundColor: formatRGB(color)
                }]}
                onPress={() => this.props.navigation.navigate('QuakeInfo', {
                    color: color,
                    url: data.properties.detail
                })}
                activeOpacity={0.5}>

                <View style={{width: 60}}>
                    <Text style={styles.magnitudeText}>
                        {formatMagnitude(data.properties.mag, 1)}
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
        );
    }
}
