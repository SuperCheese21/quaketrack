import React, { Component } from 'react';
import { View, Text } from 'react-native';

import QuakesList from './quakesList';
import styles from './styles.js';

class App extends Component {
    render() {
        return(
            <View style = {{flex: 1}}>
                <Text style={styles.listHeader}>
                    Recent Earthquakes
                </Text>
                <QuakesList />
            </View>
        )
    }
}

export default App;
