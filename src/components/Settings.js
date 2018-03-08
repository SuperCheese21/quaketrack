import React, { Component } from 'react';
import { Button, Picker, Text, View } from 'react-native';
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
                <View style={styles.settingsRow}>
                    <Text style={styles.settingsText}>Minimum Magnitude</Text>
                    <Picker
                        selectedValue={this.state.options.database.minmagnitude}
                        onValueChange={(itemValue, itemIndex) => {
                            let options = this.state.options;
                            options.database.minmagnitude = itemValue;
                            this.setState({
                                type: 'database',
                                options: options
                            });
                        }}
                        style={{flex: 1}}>

                        <Picker.Item label='-' value='' />
                        <Picker.Item label='0' value='0' />
                        <Picker.Item label='0.5' value='0.5' />
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='1.5' value='1.5' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='2.5' value='2.5' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='3.5' value='3.5' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='4.5' value='4.5' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='5.5' value='5.5' />
                        <Picker.Item label='6' value='6' />
                        <Picker.Item label='6.5' value='6.5' />
                        <Picker.Item label='7' value='7' />
                        <Picker.Item label='7.5' value='7.5' />
                        <Picker.Item label='8' value='8' />
                        <Picker.Item label='8.5' value='8.5' />
                        <Picker.Item label='9' value='9' />

                    </Picker>
                </View>

                <View style={styles.settingsRow}>
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

                <View style={[styles.settingsRow, {marginTop: 5}]}>
                    <View style={{flex: 1}}>
                        <Button
                            title='Reset'
                            color='red'
                            onPress={() => {
                                this.setState({
                                    type: 'feed'
                                });
                            }} />
                    </View>

                    <View style={{flex: 1}}>
                        <Button
                            title='Save and Close'
                            onPress={() => {
                                this.props.navigation.state.params.refreshData(
                                    this.state.type, this.state.options
                                );
                                this.props.navigation.goBack();
                            }} />
                    </View>
                </View>

            </View>
        )
    }
}

export default Settings;
