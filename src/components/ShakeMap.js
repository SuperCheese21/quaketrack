import React from 'react';
import MapView from 'react-native-maps';

import ShakeMapOverlay from './ShakeMapOverlay';

import { formatRGB } from '../lib/util/colorUtil';
import mapStyle from '../config/map_styles/map_style.json';

const ShakeMap = ({
  color,
  coordinates: [longitude, latitude],
  shakeMapData,
}) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude,
      longitude,
      latitudeDelta: 8,
      longitudeDelta: 4,
    }}
    rotateEnabled={false}
    customMapStyle={mapStyle}
  >
    <ShakeMapOverlay data={shakeMapData} />

    <MapView.Marker
      coordinate={{
        latitude,
        longitude,
      }}
      pinColor={formatRGB(color)}
    />
  </MapView>
);

export default ShakeMap;
