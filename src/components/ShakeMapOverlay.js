import React from 'react';
import { Polyline } from 'react-native-maps';

const ShakeMapOverlay = ({ data }) => {
  if (data.length) {
    return data.map((feature, i) =>
      feature.geometry.coordinates.map((line, j) => (
        <Polyline
          key={i + '_' + j}
          coordinates={line.map(coords => ({
            latitude: parseFloat(coords[1]),
            longitude: parseFloat(coords[0])
          }))}
          strokeWidth={feature.properties.weight / 2}
          strokeColor={feature.properties.color}
        />
      ))
    );
  }
  return null;
};

export default ShakeMapOverlay;
