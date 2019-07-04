import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import Slider from 'react-native-slider';

import styles from '../config/styles';

export default class SettingsSlider extends PureComponent {
  render() {
    return (
      <View style={{ height: 65 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
            {this.props.label}
          </Text>

          <Text style={styles.settingsSliderValue}>{this.props.value}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Slider
            minimumValue={this.props.minimumValue}
            maximumValue={this.props.maximumValue}
            step={this.props.step}
            value={this.props.value}
            thumbTintColor="#0000ff"
            minimumTrackTintColor="#c3c3c3"
            maximumTrackTintColor="#d8d8d8"
            onValueChange={this.props.onValueChange}
          />
        </View>
      </View>
    );
  }
}
