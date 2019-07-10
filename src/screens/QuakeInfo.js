import React, { PureComponent } from 'react';
import { BackHandler, Linking, Text, View } from 'react-native';

import Button from '../components/Button';

import { formatRGBA } from '../lib/util/colorUtil';
import { formatTime, formatMagnitude } from '../lib/util/formatData';
import colors from '../config/colors.json';
import styles from '../config/styles';

export default class QuakeInfo extends PureComponent {
  state = {
    data: {}
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    try {
      const res = await fetch(this.props.navigation.state.params.url);
      const data = await res.json();
      this.setState({ data });
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  static navigationOptions = {
    title: 'Earthquake'
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    if (!Object.keys(this.state.data).length) {
      return null;
    }

    const color = this.props.navigation.state.params.color;
    const data = this.state.data;
    const url = data.properties.products.shakemap
      ? data.properties.products.shakemap[0].contents['download/cont_mi.json']
          .url
      : '';

    return (
      <View
        style={[
          styles.infoView,
          {
            backgroundColor: formatRGBA(color, 0.5)
          }
        ]}
      >
        <Text style={styles.infoTitle}>
          {'M ' + formatMagnitude(data.properties.mag, 2)}
        </Text>
        <Text
          style={styles.infoLink}
          onPress={() => Linking.openURL(data.properties.url)}
        >
          {data.properties.place}
        </Text>
        <Text style={{ color: 'black' }}>
          Depth: {data.geometry.coordinates[2]} km
        </Text>
        <Text style={{ color: 'black' }}>
          Occurred {formatTime(data.properties.time)}
        </Text>
        <Text style={{ color: 'black' }}>
          Updated {formatTime(data.properties.updated)}
        </Text>
        <Text style={{ color: 'black' }}>
          Felt: {data.properties.felt || 'N/A'}
        </Text>
        <Text style={{ color: 'black' }}>
          Significance: {data.properties.sig}
        </Text>
        <Button
          text="ShakeMap"
          color={colors.header}
          textColor="black"
          height={50}
          onPress={() =>
            this.props.navigation.navigate('ShakeMap', {
              color,
              data,
              url
            })
          }
        />
      </View>
    );
  }
}
