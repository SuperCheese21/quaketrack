import React, { PureComponent } from 'react';
import { BackHandler, Linking, Text, View } from 'react-native';

import { formatRGBA } from '../lib/util/colorUtil';
import { formatTime, formatMagnitude } from '../lib/util/formatData';
import LoadingSpinner from '../components/LoadingSpinner';

export default class QuakeInfo extends PureComponent {
  state = {
    quakeData: {},
    shakeMapData: {}
  };

  static navigationOptions = {
    title: 'Earthquake'
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    try {
      const res = await fetch(this.props.navigation.state.params.url);
      const quakeData = await res.json();
      this.setState({ quakeData });
    } catch (err) {
      console.error(err.message);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    if (!Object.keys(this.state.data).length) {
      return <LoadingSpinner />;
    }

    const color = this.props.navigation.state.params.color;
    const data = this.state.quakeData;
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
        {/* <Button
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
        /> */}
      </View>
    );
  }
}

const styles = {
  infoLink: {
    height: 40,
    color: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline'
  },
  infoTitle: {
    height: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  infoView: {
    borderRadius: 10,
    flex: 1,
    margin: 5,
    padding: 10
  }
};
