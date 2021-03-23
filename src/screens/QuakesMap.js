import React, { useContext } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import QuakesMapOverlay from '../components/QuakesMapOverlay';
import { QuakesContext } from '../components/QuakesProvider';
import mapStyle from '../config/map_styles/map_style.json';
import plates from '../lib/data/tectonic_plates.json';
import regions from '../lib/data/tectonic_regions.json';
import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';

const QuakesMap = ({ stackNavigation }) => {
  const { data } = useContext(QuakesContext);

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

        {data.features?.map(({ geometry, id, properties }) => {
          const color = getRGB(properties.mag, 1.0, 9.5);
          return (
            <Marker
              key={id}
              coordinate={{
                latitude: geometry.coordinates[1],
                longitude: geometry.coordinates[0],
              }}
              title={`M${properties.mag}`}
              description={formatTime(properties.time)}
              onCalloutPress={() =>
                stackNavigation.navigate('QuakeInfo', {
                  color,
                  url: properties.detail,
                })
              }
              pinColor={formatRGB(color)}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default QuakesMap;
