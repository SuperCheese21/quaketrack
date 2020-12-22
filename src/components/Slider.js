import React from 'react';
import Slider from 'react-native-slider';

const SettingsSlider = ({
  disabled,
  maximumValue,
  minimumValue,
  onValueChange,
  step,
  value,
}) => (
  <Slider
    disabled={disabled}
    style={{
      opacity: disabled ? 0.5 : 1,
    }}
    minimumValue={minimumValue}
    maximumValue={maximumValue}
    step={step}
    value={value}
    thumbTintColor="#0000ff"
    minimumTrackTintColor="#c3c3c3"
    maximumTrackTintColor="#d8d8d8"
    onValueChange={onValueChange}
  />
);

export default SettingsSlider;
