import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import QuakesMapOverlay from '../components/QuakesMapOverlay';

import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';
import mapStyle from '../config/map_styles/map_style.json';
import plates from '../lib/data/tectonic_plates.json';
import regions from '../lib/data/tectonic_regions.json';

export default class QuakesMap extends PureComponent {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name={'map-marker'} size={20} color={tintColor} />;
    },
  });

  render() {
    const quakes = this.props.screenProps.data.features;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 150,
            longitudeDelta: 75,
          }}
          rotateEnabled={false}
          customMapStyle={mapStyle}
        >
          <QuakesMapOverlay
            data={plates.features}
            rgb={[0, 0, 0]}
            fillOpacity={0}
          />

          <QuakesMapOverlay
            data={regions.features}
            rgb={[255, 0, 0]}
            fillOpacity={0.1}
          />

          {quakes.map(data => {
            const color = getRGB(data.properties.mag, 1.0, 9.5);
            return (
              <MapView.Marker
                key={data.id}
                coordinate={{
                  latitude: data.geometry.coordinates[1],
                  longitude: data.geometry.coordinates[0],
                }}
                title={'M' + data.properties.mag}
                description={formatTime(data.properties.time)}
                onCalloutPress={() =>
                  this.props.screenProps.stackNavigation.navigate('QuakeInfo', {
                    color,
                    url: data.properties.detail,
                  })
                }
                pinColor={formatRGB(color)}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}
