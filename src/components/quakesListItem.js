import React, { Component } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import getColor from '../lib/getColor';

class QuakesListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.properties,
            color: getColor(this.props.data.properties.mag, 2.5, 9.7)
        }
    }

    formatTime(time) {
        return time.format("YYYY-MM-DD HH:mm:ss") + " UTC";
    }

    render() {
        return(
            <View style={{
                flexDirection: 'row',
                backgroundColor: this.state.color,
                height: 60,
                borderRadius: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                padding: 5
            }}>
                <View style={{width: 55}}>
                    <Text style={{
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 24,
                        flex: 1
                    }}>
                        {this.state.data.mag}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{
                        textAlignVertical: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        flex: 1
                    }}>
                        {this.state.data.place}
                    </Text>
                    <Text style={{
                        textAlignVertical: 'center',
                        color: 'black',
                        flex: 1
                    }}>
                        {this.formatTime(moment.utc(this.state.data.time))}
                    </Text>
                </View>
            </View>
        )
    }
}

export default QuakesListItem;
