import React from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';

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

const styles = {
  settingsSliderValue: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 0.2
  }
};

export default SettingsSlider;
