import React from 'react';
import { MapView } from 'expo';

const ShakeMapOverlay = ({ data }) => {
  if (data.length) {
    return data.map((feature, i) =>
      feature.geometry.coordinates.map((line, j) => (
        <MapView.Polyline
          key={i + '_' + j}
          coordinates={line.map(coords => ({
            latitude: parseFloat(coords[1]),
            longitude: parseFloat(coords[0]),
          }))}
          strokeWidth={feature.properties.weight / 2}
          strokeColor={feature.properties.color}
        />
      )),
    );
  }
  return null;
};

export default ShakeMapOverlay;
