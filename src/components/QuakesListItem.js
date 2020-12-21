import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime, formatMagnitude } from '../lib/util/formatData';

const QuakesListItem = ({ data, stackNavigation }) => {
  const {
    properties: { time, place, mag, detail },
  } = data;
  const color = getRGB(mag, 1.0, 9.5);
  const styles = {
    listItem: {
      flexDirection: 'row',
      height: 75,
      borderRadius: 5,
      marginTop: 2.5,
      marginBottom: 2.5,
      marginLeft: 5,
      marginRight: 5,
      padding: 5,
    },
    locationText: {
      marginLeft: 3,
      textAlignVertical: 'center',
      color: 'black',
      fontWeight: 'bold',
      flex: 1,
    },
    magnitudeText: {
      textAlignVertical: 'center',
      textAlign: 'center',
      color: 'white',
      fontSize: 28,
      flex: 1,
    },
    timestampText: {
      marginLeft: 3,
      textAlignVertical: 'center',
      color: 'black',
    },
  };

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          backgroundColor: formatRGB(color),
        },
      ]}
      onPress={() =>
        stackNavigation.navigate('QuakeInfo', {
          color,
          url: detail,
        })
      }
      activeOpacity={0.5}
    >
      <View style={{ width: 60 }}>
        <Text style={styles.magnitudeText}>{formatMagnitude(mag, 1)}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', flex: 1.5 }}>
          <Icon
            name="location-on"
            size={20}
            color="black"
            style={{ textAlignVertical: 'center' }}
          />
          <Text style={styles.locationText}>{place}</Text>
        </View>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Icon
            name="access-time"
            size={20}
            color="black"
            style={{ textAlignVertical: 'center' }}
          />
          <Text style={styles.timestampText}>{formatTime(time)}</Text>
        </View>
      </View>

      <View style={{ width: 25, justifyContent: 'center' }}>
        <Icon name="chevron-right" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default QuakesListItem;
