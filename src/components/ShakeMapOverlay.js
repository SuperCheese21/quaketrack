import React from 'react';
import MapView from 'react-native-maps';
import { v4 as uuid } from 'uuid';

const ShakeMapOverlay = ({ data }) => {
  if (data.length) {
    return data.map(feature =>
      feature.geometry.coordinates.map(line => (
        <MapView.Polyline
          key={uuid()}
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
