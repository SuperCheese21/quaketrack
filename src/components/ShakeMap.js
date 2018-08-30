import React, { PureComponent } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

import ShakeMapOverlay from './ShakeMapOverlay';

import { getJson } from '../api/fetchData';
import { formatRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';
import mapStyle from '../config/map_styles/map_style_shakemap.json';
import styles from '../config/styles';

export default class ShakeMap extends PureComponent {
    state = {
        data: [],
        isLoading: true
    }

    static navigationOptions = {
        title: 'ShakeMap',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    };

    componentDidMount() {
        const url = this.props.navigation.state.params.url;
        if (url) {
            getJson([url])
                .then(res => {
                    this.setState({
                        data: res[0].features,
                        isLoading: false
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Spinner visible={true} />;
        }

        const params = this.props.navigation.state.params;
        const data = params.data;

        return(
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    latitude: data.geometry.coordinates[1],
                    longitude: data.geometry.coordinates[0],
                    latitudeDelta: 8,
                    longitudeDelta: 4
                }}
                rotateEnabled={false}
                customMapStyle={mapStyle}>

                <ShakeMapOverlay data={this.state.data} />

                <Marker
                    coordinate={{
                        latitude: data.geometry.coordinates[1],
                        longitude: data.geometry.coordinates[0]
                    }}
                    title={'M' + data.properties.mag}
                    description={formatTime(data.properties.time)}
                    pinColor={formatRGB(params.color)} />

            </MapView>
        );
    }
}
