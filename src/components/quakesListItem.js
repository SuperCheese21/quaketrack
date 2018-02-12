import React, { Component } from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

class QuakesListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data.properties
        }
    }

    formatTime(time) {
        return time.format("YYYY-MM-DD HH:mm:ss");
    }

    render() {
        return(
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'red',
                height: 60,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 5,
                padding: 5
            }}>
                <View style={{width: 50}}>
                    <Text style={{
                        textAlignVertical: 'center',
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
