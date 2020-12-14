import React from 'react';
import { MapView } from 'expo';

import ShakeMapOverlay from './ShakeMapOverlay';

import { formatRGB } from '../lib/util/colorUtil';
import mapStyle from '../config/map_styles/map_style.json';

const ShakeMap = ({ color, coordinates, shakeMapData }) => (
  <MapView
    style={{ flex: 1 }}
    initialRegion={{
      latitude: coordinates[1],
      longitude: coordinates[0],
      latitudeDelta: 8,
      longitudeDelta: 4,
    }}
    rotateEnabled={false}
    customMapStyle={mapStyle}
  >
    <ShakeMapOverlay data={shakeMapData} />

    <MapView.Marker
      coordinate={{
        latitude: coordinates[1],
        longitude: coordinates[0],
      }}
      pinColor={formatRGB(color)}
    />
  </MapView>
);

export default ShakeMap;
