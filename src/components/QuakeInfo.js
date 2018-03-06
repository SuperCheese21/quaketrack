import React, { Component } from 'react';
import { Linking, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import LoadingSpinner from './LoadingSpinner';

import colorUtil from '../lib/colorUtil';
import formatTime from '../lib/formatTime';
import getInfo from '../lib/getInfo';
import styles from './styles.js';


class QuakeInfo extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            isLoading: true,
            color: params.color,
            url: params.url
        };
    }

    static navigationOptions = {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        getInfo.getJson(this.state.url).then((res) => {
            this.setState({
                isLoading: false,
                type: res.type,
                data: res.properties,
                geometry: res.geometry,
                id: res.id
            });
        }, (err) => {
            console.error('Error: ' + err);
        });
    }

    render() {
        if (this.state.isLoading) {
            return ( <LoadingSpinner /> );
        }

        return (
            <View style={[styles.infoView, {
                backgroundColor: colorUtil.formatRGBA(this.state.color, 0.5)
            }]}>
                <Text style={styles.infoTitle}>
                    M{this.state.data.mag}
                </Text>
                <Text style={styles.infoLink} onPress={
                    () => Linking.openURL(this.state.data.url)
                }>
                    {this.state.data.place}
                </Text>
                <Text style={{color: 'black'}}>
                    Depth: {this.state.geometry.coordinates[2]} km
                </Text>
                <Text style={{color: 'black'}}>
                    Occurred {formatTime(this.state.data.time)}
                </Text>
                <Text style={{color: 'black'}}>
                    Updated {formatTime(this.state.data.updated)}
                </Text>
                <MapView
                    style={{marginTop: 10, flex: 1}}
                    initialRegion={{
                        latitude: this.state.geometry.coordinates[1],
                        longitude: this.state.geometry.coordinates[0],
                        latitudeDelta: 8,
                        longitudeDelta: 4
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: this.state.geometry.coordinates[1],
                            longitude: this.state.geometry.coordinates[0]
                        }}
                        title={
                            this.state.geometry.coordinates[1] + ', ' +
                            this.state.geometry.coordinates[0]
                        }
                        pinColor={colorUtil.formatRGB(this.state.color)}
                    />
                </MapView>
            </View>
        )
    }
}

export default QuakeInfo;
