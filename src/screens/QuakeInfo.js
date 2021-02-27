import React, { PureComponent } from 'react';
import { BackHandler, Linking, Text, View } from 'react-native';

import LoadingSpinner from '../components/LoadingSpinner';
import ShakeMap from '../components/ShakeMap';
import { formatRGBA } from '../lib/util/colorUtil';
import { formatTime, formatMagnitude } from '../lib/util/formatData';

const styles = {
  infoLink: {
    height: 40,
    color: 'blue',
    textAlign: 'center',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
  },
  infoTitle: {
    height: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  infoView: {
    borderRadius: 10,
    flex: 1,
    margin: 5,
    padding: 10,
  },
};

export default class QuakeInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shakeMapData: [],
      quakeData: {},
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    try {
      const res = await fetch(navigation.state.params.url);
      const quakeData = await res.json();
      const shakeMapData = await this.getShakeMapData(quakeData);
      this.setState({ shakeMapData, quakeData });
    } catch (err) {
      console.error(err.message);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getShakeMapData = async ({
    properties: {
      products: { shakemap },
    },
  }) => {
    if (!shakemap) return {};
    const res = await fetch(shakemap[0].contents['download/cont_mi.json'].url);
    const json = await res.json();
    return json.features;
  };

  handleBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
    return true;
  };

  render() {
    const { navigation } = this.props;
    const { quakeData } = this.state;

    if (!Object.keys(quakeData.length)) {
      return <LoadingSpinner />;
    }

    const { color } = navigation.state.params;
    const {
      shakeMapData,
      quakeData: {
        geometry: { coordinates },
        properties,
      },
    } = this.state;

    return (
      <View
        style={[
          styles.infoView,
          {
            backgroundColor: formatRGBA(color, 0.5),
          },
        ]}
      >
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.infoTitle}>
            {`M ${formatMagnitude(properties.mag, 2)}`}
          </Text>
          <Text
            style={styles.infoLink}
            onPress={() => Linking.openURL(properties.url)}
          >
            {properties.place}
          </Text>
          <Text style={{ color: 'black' }}>Depth: {coordinates[2]} km</Text>
          <Text style={{ color: 'black' }}>
            Occurred {formatTime(properties.time)}
          </Text>
          <Text style={{ color: 'black' }}>
            Updated {formatTime(properties.updated)}
          </Text>
          <Text style={{ color: 'black' }}>
            Felt: {properties.felt || 'N/A'}
          </Text>
          <Text style={{ color: 'black' }}>Significance: {properties.sig}</Text>
        </View>

        <ShakeMap
          color={color}
          coordinates={coordinates}
          shakeMapData={shakeMapData}
        />
      </View>
    );
  }
}
