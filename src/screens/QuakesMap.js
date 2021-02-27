import React, { PureComponent } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import QuakesMapOverlay from '../components/QuakesMapOverlay';

import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';
import mapStyle from '../config/map_styles/map_style.json';
import plates from '../lib/data/tectonic_plates.json';
import regions from '../lib/data/tectonic_regions.json';
import { QuakesContext } from '../components/QuakesProvider';

class QuakesMap extends PureComponent {
  render() {
    const { data } = this.context;
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

          {data?.quakes?.map(({ geometry, id, properties }) => {
            const color = getRGB(properties.mag, 1.0, 9.5);
            return (
              <MapView.Marker
                key={id}
                coordinate={{
                  latitude: geometry.coordinates[1],
                  longitude: geometry.coordinates[0],
                }}
                title={`M + ${properties.mag}`}
                description={formatTime(properties.time)}
                onCalloutPress={() => {}}
                pinColor={formatRGB(color)}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

QuakesMap.contextType = QuakesContext;

export default QuakesMap;
