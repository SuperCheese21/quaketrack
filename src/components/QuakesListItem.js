import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { formatRGB, getRGB } from '../lib/util/colorUtil';
import { formatTime, formatMagnitude } from '../lib/util/formatData';
import styles from '../config/styles';

const QuakesListItem = ({ data, stackNavigation }) => {
  const {
    properties: { time, place, mag, detail }
  } = data;
  const color = getRGB(mag, 1.0, 9.5);

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          backgroundColor: formatRGB(color)
        }
      ]}
      onPress={() =>
        stackNavigation.navigate('QuakeInfo', {
          color,
          url: detail
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
