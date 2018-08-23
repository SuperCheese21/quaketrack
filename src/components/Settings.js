import React, { Component } from 'react';
import { Button, Picker, Text, View } from 'react-native';

import SettingsDatePicker from './SettingsDatePicker';
import SettingsSwitch from './SettingsSwitch';
import SettingsSlider from './SettingsSlider';

import colors from '../config/colors';
import styles from '../config/styles';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.screenProps.getSettings();
    }

    static navigationOptions = {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    }

    saveSettings = () => {
        this.props.screenProps.setSettings(this.state);
    }

    render() {
        return(
            <View style={styles.settingsView}>

                <SettingsSlider
                    label="Minimum Magnitude"
                    minimumValue={1}
                    maximumValue={9}
                    step={0.5}
                    value={this.state.minmagnitude}
                    onValueChange={value => {
                        this.setState({
                            minmagnitude: value
                        });
                    }} />

                <View style={styles.settingsItem}>
                    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                        Number of Earthquakes
                    </Text>

                    <Picker
                        style={{ flex: 1, alignSelf: 'center' }}
                        selectedValue={this.state.limit}
                        onValueChange={value => {
                            this.setState({
                                limit: value
                            });
                        }}>

                        <Picker.Item label='10' value={10} />
                        <Picker.Item label='50' value={50} />
                        <Picker.Item label='100' value={100} />
                        <Picker.Item label='500' value={500} />
                        <Picker.Item label='1000' value={1000} />

                    </Picker>
                </View>

                <SettingsSwitch
                    label="Set Date Range"
                    value={this.state.dateEnabled}
                    onValueChange={value => {
                        this.setState({
                            dateEnabled: value
                        });
                    }} />

                <SettingsDatePicker
                    label="Start Time"
                    date={this.state.starttime}
                    subItem={true}
                    enabled={this.state.dateEnabled}
                    onValueChange={value => {
                        this.setState({
                            starttime: value
                        });
                    }} />

                <SettingsDatePicker
                    label="End Time"
                    date={this.state.endtime}
                    subItem={true}
                    enabled={this.state.dateEnabled}
                    onValueChange={value => {
                        this.setState({
                            endtime: value
                        });
                    }} />

                <View style={styles.settingsItem}>
                    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                        Order By
                    </Text>

                    <Picker
                        style={{ flex: 1, alignSelf: 'center' }}
                        selectedValue={this.state.orderby}
                        onValueChange={value => {
                            this.setState({
                                orderby: value
                            });
                        }}>

                        <Picker.Item label='Time (descending)' value='time' />
                        <Picker.Item label='Time (ascending)' value='time-asc' />
                        <Picker.Item label='Magnitude (descending)' value='magnitude' />
                        <Picker.Item label='Magnitude (ascending)' value='magnitude-asc' />

                    </Picker>
                </View>

                <View style={styles.settingsItem}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Save and Close"
                            onPress={() => {
                                this.saveSettings();
                                this.props.navigation.goBack();
                                this.props.screenProps.onRefresh();
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}
