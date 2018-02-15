import React, { Component } from 'react';
import { Text, View } from 'react-native';

import getColor from '../lib/getColor';
import formatTime from '../lib/formatTime';
import styles from './styles.js';

class QuakesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.properties,
            color: getColor(this.props.data.properties.mag, 1.0, 9.5)
        }
    }

    render() {
        return(
            <View style={[styles.listItem, {backgroundColor: this.state.color}]}>
                <View style={{width: 55, marginRight: 5}}>
                    <Text style={styles.magnitudeText}>
                        {this.state.data.mag}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.locationText}>
                        {this.state.data.place}
                    </Text>
                    <Text style={styles.timestampText}>
                        {formatTime(this.state.data.time)}
                    </Text>
                </View>
            </View>
        )
    }
}

export default QuakesListItem;
