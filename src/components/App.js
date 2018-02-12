import React, { Component } from 'react';
import { View, Text } from 'react-native';

import QuakesList from './quakesList';

class App extends Component {
    render() {
        return(
            <View style = {{
                flex: 1,
                backgroundColor: '#ff0000'
            }}>
                <Text style={{
                    fontSize: 30,
                    color: 'black',
                    fontWeight: 'bold',
                    backgroundColor: '#e0e0e0',
                    textAlign: 'center'
                }}>
                    Recent Earthquakes
                </Text>
                <QuakesList />
            </View>
        )
    }
}

export default App;
