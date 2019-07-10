import React, { PureComponent } from 'react';
import MapView, { Marker } from 'react-native-maps';

import ShakeMapOverlay from './ShakeMapOverlay';

import { getJson } from '../api/fetchData';
import { formatRGB } from '../lib/util/colorUtil';
import { formatTime } from '../lib/util/formatData';
import mapStyle from '../config/map_styles/map_style_shakemap.json';
import styles from '../config/styles';

export default class ShakeMap extends PureComponent {
  state = {
    data: [],
    isLoading: true
  };

  static navigationOptions = {
    title: 'ShakeMap',
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle
  };

  componentDidMount() {
    const { url } = this.props.navigation.state.params;
    if (url) {
      getJson([url])
        .then(res => {
          this.setState({
            data: res[0].features,
            isLoading: false
          });
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    const {
      params: { color, data }
    } = this.props.navigation.state;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0],
          latitudeDelta: 8,
          longitudeDelta: 4
        }}
        rotateEnabled={false}
        customMapStyle={mapStyle}
      >
        <ShakeMapOverlay data={this.state.data} />

        <Marker
          coordinate={{
            latitude: data.geometry.coordinates[1],
            longitude: data.geometry.coordinates[0]
          }}
          title={'M' + data.properties.mag}
          description={formatTime(data.properties.time)}
          pinColor={formatRGB(color)}
        />
      </MapView>
    );
  }
}
