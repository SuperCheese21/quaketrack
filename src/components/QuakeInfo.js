import React, { PureComponent } from 'react';
import { Linking, Text, View } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

import LoadingSpinner from './LoadingSpinner';

import { formatRGBA, formatRGB } from '../lib/colorUtil';
import { formatTime, formatMagnitude } from '../lib/formatData';
import { getJson } from '../lib/fetchData';
import styles from '../config/styles';

export default class QuakeInfo extends PureComponent {
    state = {
        isLoading: true,
        data: {}
    }

    componentDidMount() {
        const url = this.props.navigation.state.params.url;
        getJson(url)
            .then(res => {
                this.setState({
                    data: res,
                    isLoading: false
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    static navigationOptions = {
        title: 'Earthquake',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    render() {
        if (this.state.isLoading) {
            return (
                <LoadingSpinner />
            );
        }

        const { params } = this.props.navigation.state;
        const color = params.color;
        const data = this.state.data;

        return (
            <View style={[styles.infoView, {
                backgroundColor: formatRGBA(color, 0.5)
            }]}>
                <Text style={styles.infoTitle}>
                    {'M ' + formatMagnitude(data.properties.mag, 2)}
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
