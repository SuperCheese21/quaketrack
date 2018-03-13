import React, { Component } from 'react';
import { Slider, Text, View } from 'react-native';

import styles from '../config/styles';

class SettingsSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'value': 2.5
        };
    }

    render() {
        return (
            <View style={{ height: 65 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                        {this.props.label}
                    </Text>

                    <Text style={styles.settingsSliderValue}>
                        {this.state.value}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Slider
                        minimumValue={this.props.minimumValue}
                        maximumValue={this.props.maximumValue}
                        step={this.props.step}
                        value={this.state.value}
                        onValueChange={this.props.onValueChange} />
                </View>
            </View>
        )
    }
}

export default SettingsSlider;
