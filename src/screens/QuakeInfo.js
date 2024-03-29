import React, { useCallback, useEffect, useState } from 'react';
import { Alert, BackHandler, Linking, Text, View } from 'react-native';

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

const QuakeInfo = ({ navigation, route }) => {
  const [shakeMapData, setShakeMapData] = useState([]);
  const [quakeData, setQuakeData] = useState({});
  const { color, url } = route.params;

  const getShakeMapData = useCallback(
    async ({
      properties: {
        products: { shakemap },
      },
    }) => {
      if (!shakemap) return [];
      try {
        const res = await fetch(
          shakemap[0].contents['download/cont_mi.json'].url,
        );
        const json = await res.json();
        return json.features;
      } catch (err) {
        Alert.alert('Error', 'Unable to fetch shakemap data');
        return [];
      }
    },
    [],
  );

  const getQuakeData = useCallback(async () => {
    try {
      const res = await fetch(url);
      const updatedQuakeData = await res.json();
      const updatedShakeMapData = await getShakeMapData(updatedQuakeData);
      setQuakeData(updatedQuakeData);
      setShakeMapData(updatedShakeMapData);
    } catch (err) {
      Alert.alert('Error', 'Unable to fetch earthquake data');
      navigation.goBack();
    }
  }, [getShakeMapData, navigation, url]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useEffect(() => {
    getQuakeData();
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [getQuakeData, handleBackPress]);

  if (!Object.keys(quakeData).length) {
    return <LoadingSpinner />;
  }

  const {
    geometry: { coordinates },
    properties,
  } = quakeData;

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
        <Text style={{ color: 'black' }}>{`Depth: ${coordinates[2]} km`}</Text>
        <Text style={{ color: 'black' }}>
          {`Occurred ${formatTime(properties.time)}`}
        </Text>
        <Text style={{ color: 'black' }}>
          {`Updated ${formatTime(properties.updated)}`}
        </Text>
        <Text style={{ color: 'black' }}>{`Felt: ${
          properties.felt || 'N/A'
        }`}</Text>
        <Text
          style={{ color: 'black' }}
        >{`Significance: ${properties.sig}`}</Text>
      </View>

      <ShakeMap
        color={color}
        coordinates={coordinates}
        mag={properties.mag}
        shakeMapData={shakeMapData}
      />
    </View>
  );
};

export default QuakeInfo;
