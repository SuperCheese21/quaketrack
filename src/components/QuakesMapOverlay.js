import React from 'react';
import { MapView } from 'expo';

import { formatRGB, formatRGBA } from '../lib/util/colorUtil';

const QuakesMapOverlay = (props) => {
  if (props.data.length) {
    return props.data.map((feature, i) =>
      feature.geometry.coordinates.map((polygon, j) => (
        <MapView.Polygon
          key={i + '_' + j}
          coordinates={polygon.map((coords) => ({
            latitude: parseFloat(coords[1]),
            longitude: parseFloat(coords[0]),
          }))}
          strokeColor={formatRGB(props.rgb)}
          strokeWidth={2}
          fillColor={formatRGBA(props.rgb, props.fillOpacity)}
        />
      ))
    );
  }
  return null;
};

export default QuakesMapOverlay;
