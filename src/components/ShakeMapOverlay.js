import React from 'react';
import { Polyline } from 'react-native-maps';

const ShakeMapOverlay = props => {
    if (props.data.length) {
        return props.data.map((feature, i) => (
            feature.geometry.coordinates.map((line, j) => (
                <Polyline
                    key={i + '_' + j}
                    coordinates={line.map(coords => ({
                        latitude: coords[1],
                        longitude: coords[0]
                    }))}
                    strokeWidth={feature.properties.weight / 2}
                    strokeColor={feature.properties.color}
                />
            ))
        ));
    }
    return null;
};

export default ShakeMapOverlay;
