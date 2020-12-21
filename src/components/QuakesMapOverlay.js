import React from 'react';
import 'react-native-get-random-values';
import MapView from 'react-native-maps';
import { v4 as uuid } from 'uuid';

import { formatRGB, formatRGBA } from '../lib/util/colorUtil';

const QuakesMapOverlay = ({ data, rgb, fillOpacity }) => {
  if (!data.length) {
    return null;
  }
  return data.map(feature =>
    feature.geometry.coordinates.map(polygon => (
      <MapView.Polygon
        key={uuid()}
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
