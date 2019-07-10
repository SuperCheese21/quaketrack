import React from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../config/styles';

const SettingsSlider = props => (
  <View style={{ height: 65 }}>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
        {props.label}
      </Text>

      <Text style={styles.settingsSliderValue}>{props.value}</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Slider
        minimumValue={props.minimumValue}
        maximumValue={props.maximumValue}
        step={props.step}
        value={props.value}
        thumbTintColor="#0000ff"
        minimumTrackTintColor="#c3c3c3"
        maximumTrackTintColor="#d8d8d8"
        onValueChange={props.onValueChange}
      />
    </View>
  </View>
);

export default SettingsSlider;
