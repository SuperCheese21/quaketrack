import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { Marker } from 'react-native-maps';

import { FilterIcon, MenuIcon } from './HeaderIcons';
import { formatRGB, getRGB } from '../lib/colorUtil';
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

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Map',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: <MenuIcon navigation={navigation} />,
            headerRight: <FilterIcon navigation={navigation} />
        };
    }

    render() {
        const quakes = this.props.screenProps.data.features;
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.isLoading} />
                <MapView
                    style={{flex: 1}}
                    initialRegion={{
                        latitude: 0,
                        longitude: 180,
                        latitudeDelta: 150,
                        longitudeDelta: 75
                    }}
                    rotateEnabled={false}
                    moveOnMarkerPress={false}>

                    {quakes.map(data => {
                        const color = getRGB(data.properties.mag, 1.0, 9.5);
                        return (
                            <Marker
                                key={data.id}
                                coordinate={{
                                    latitude: data.geometry.coordinates[1],
                                    longitude: data.geometry.coordinates[0]
                                }}
                                onPress={() => this.props.navigation.navigate('QuakeInfo', {
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
