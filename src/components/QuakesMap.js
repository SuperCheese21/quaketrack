import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { formatRGB, getRGB } from '../lib/colorUtil';
import styles from '../config/styles';

export default class QuakesMap extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Map',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerLeft: (
                <Icon
                    name='menu'
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                    size={25}
                    color='#000000'
                />
            ),
            headerRight: (
                <Icon
                    name='settings'
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Filters')}
                    size={25}
                    color='#000000'
                />
            )
        }
    };

    render() {
        const quakes = this.props.screenProps.data.features;
        return (
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    latitude: 0,
                    longitude: 180,
                    latitudeDelta: 150,
                    longitudeDelta: 75
                }}>

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
                                'color': color,
                                'data': data
                            })}
                            pinColor={formatRGB(color)}
                        />
                    );
                })}

            </MapView>
        );
    }
}
