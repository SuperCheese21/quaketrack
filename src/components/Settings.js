import React, { Component } from 'react';
import { Button, Picker, Slider, Text, View } from 'react-native';
import moment from 'moment';

import colors from '../config/colors';
import styles from '../config/styles';

class Settings extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            'type': 'database',
            'options': params.options
        }
    }

    static navigationOptions = {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    }

    render() {
        return(
            <View style={styles.settingsView}>
                <View style={styles.settingsItem}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={styles.settingsText}>Minimum Magnitude</Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            flex: 0.2
                        }}>
                            {this.state.options.database.minmagnitude}
                        </Text>
                    </View>

                    <View style={{flex: 1}}>
                        <Slider
                            minimumValue={1}
                            maximumValue={9}
                            step={0.5}
                            value={Number(this.state.options.database.minmagnitude)}
                            onValueChange={
                                (itemValue) => {
                                    let options = this.state.options;
                                    options.database.minmagnitude = itemValue;
                                    this.setState({
                                        type: 'database',
                                        options: options
                                    })
                                }
                            } />
                    </View>
                </View>

                <View style={styles.settingsItem}>
                    <Text style={styles.settingsText}>Number of Earthquakes</Text>
                    <Picker
                        selectedValue={this.state.options.database.limit}
                        onValueChange={(itemValue, itemIndex) => {
                            let options = this.state.options;
                            options.database.limit = itemValue;
                            this.setState({
                                type: 'database',
                                options: options
                            });
                        }}
                        style={{flex: 1}}>

                        <Picker.Item label='10' value={10} />
                        <Picker.Item label='50' value={50} />
                        <Picker.Item label='100' value={100} />
                        <Picker.Item label='500' value={500} />

                    </Picker>
                </View>

                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <View style={{flex: 1}}>
                        <Button
                            title='Reset'
                            color='red'
                            onPress={() => {
                                this.setState({ type: 'feed' });
                            }} />
                    </View>

                    <View style={{flex: 1}}>
                        <Button
                            title='Save and Close'
                            onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}

export default Settings;
