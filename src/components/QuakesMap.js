import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { Marker, Polygon } from 'react-native-maps';

import { FilterIcon, MenuIcon } from './HeaderIcons';
import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';
import mapStyle from '../config/map_styles/map_style.json';
import regions from '../lib/data/tectonic_regions.json';
import styles from '../config/styles';

export default class QuakesMap extends PureComponent {
    state = {
        isLoading: true
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Map',
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        headerLeft: <MenuIcon navigation={navigation} />,
        headerRight: <FilterIcon navigation={navigation} />
    })

    render() {
        const quakes = this.props.screenProps.data.features;
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.isLoading} />
                <MapView
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 150,
                        longitudeDelta: 75
                    }}
                    rotateEnabled={false}
                    customMapStyle={mapStyle}>

                    {regions.tectonic.features.map((feature, i) => (
                        feature.geometry.coordinates.map((polygon, j) => (
                            <Polygon
                                key={i + '_' + j}
                                coordinates={polygon.map(coords => ({
                                    latitude: parseFloat(coords[1]),
                                    longitude: parseFloat(coords[0])
                                }))}
                                strokeColor='#ff0000'
                                strokeWidth={2}
                            />
                        ))
                    ))}

                    {quakes.map(data => {
                        const color = getRGB(data.properties.mag, 1.0, 9.5);
                        return (
                            <Marker
                                key={data.id}
                                coordinate={{
                                    latitude: data.geometry.coordinates[1],
                                    longitude: data.geometry.coordinates[0]
                                }}
                                title={'M' + data.properties.mag}
                                description={formatTime(data.properties.time)}
                                onCalloutPress={() => this.props.navigation.navigate('QuakeInfo', {
                                    color: color,
                                    url: data.properties.detail
                                })}
                                pinColor={formatRGB(color)}
                            />
                        );
                    })}

                </MapView>
            </View>
        );
    }
}
