import React, { Component } from 'react';
import { Linking, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import LoadingSpinner from './LoadingSpinner';

import { formatRGBA, formatRGB } from '../lib/colorUtil';
import { formatTime, checkZeros } from '../lib/formatData';
import styles from '../config/styles';

export default class QuakeInfo extends Component {
    static navigationOptions = {
        title: 'Earthquake',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    render() {
        const { params } = this.props.navigation.state;
        const color = params.color;
        const data = params.data;

        return (
            <View style={[styles.infoView, {
                backgroundColor: formatRGBA(color, 0.5)
            }]}>
                <Text style={styles.infoTitle}>
                    {'M ' + checkZeros(data.properties.mag)}
                </Text>
                <Text style={styles.infoLink} onPress={
                    () => Linking.openURL(data.properties.url)
                }>
                    {data.properties.place}
                </Text>
                <Text style={{color: 'black'}}>
                    Depth: {data.geometry.coordinates[2]} km
                </Text>
                <Text style={{color: 'black'}}>
                    Occurred {formatTime(data.properties.time)}
                </Text>
                <Text style={{color: 'black'}}>
                    Updated {formatTime(data.properties.updated)}
                </Text>
                <MapView
                    style={{marginTop: 10, flex: 1}}
                    initialRegion={{
                        latitude: data.geometry.coordinates[1],
                        longitude: data.geometry.coordinates[0],
                        latitudeDelta: 8,
                        longitudeDelta: 4
                    }}>

                    <Marker
                        coordinate={{
                            latitude: data.geometry.coordinates[1],
                            longitude: data.geometry.coordinates[0]
                        }}
                        title={
                            data.geometry.coordinates[1] + ', ' +
                            data.geometry.coordinates[0]
                        }
                        pinColor={formatRGB(color)} />

                </MapView>
            </View>
        )
    }
}
