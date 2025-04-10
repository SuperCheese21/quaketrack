import { getRandomBytes } from 'expo-crypto';
import React from 'react';
import 'react-native-get-random-values';
import { Polygon } from 'react-native-maps';

import { formatRGB, formatRGBA } from '../lib/util/colorUtil';

const QuakesMapOverlay = ({ data, rgb, fillOpacity }) => {
  if (!data.length) {
    return null;
  }
  return data.flatMap(feature =>
    feature.geometry.coordinates.map(polygon => (
      <Polygon
        key={getRandomBytes(32)}
        coordinates={polygon.map(([lon, lat]) => ({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        }))}
        strokeColor={formatRGB(rgb)}
        strokeWidth={2}
        fillColor={formatRGBA(rgb, fillOpacity)}
      />
    )),
  );
};

export default QuakesMapOverlay;
