import React from 'react';
import Slider from 'react-native-slider';

const SettingsSlider = props => (
  <Slider
    disabled={props.disabled}
    style={{
      opacity: props.disabled ? 0.5 : 1,
    }}
    minimumValue={props.minimumValue}
    maximumValue={props.maximumValue}
    step={props.step}
    value={props.value}
    thumbTintColor="#0000ff"
    minimumTrackTintColor="#c3c3c3"
    maximumTrackTintColor="#d8d8d8"
    onValueChange={props.onValueChange}
  />
);

export default SettingsSlider;
