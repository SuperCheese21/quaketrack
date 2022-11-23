import { getRandomBytes } from 'expo-random';
import React from 'react';
import { Polyline } from 'react-native-maps';

const ShakeMapOverlay = ({ data }) => {
  if (data.length) {
    return data.flatMap(feature =>
      feature.geometry.coordinates.map(line => (
        <Polyline
          key={getRandomBytes(32)}
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
