import React, { Component } from 'react';
import { Button, Picker, Text, View } from 'react-native';
import moment from 'moment';

import SettingsDatePicker from './SettingsDatePicker';
import SettingsSwitch from './SettingsSwitch';
import SettingsSlider from './SettingsSlider';

import colors from '../config/colors';
import styles from '../config/styles';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'type': 'database',
            'minmagnitude': 2.5,
            'latitude': null,
            'longitude': null,
            'maxradiuskm': 20001.6,
            'limit': 100,
            'starttime': moment().subtract(30, 'days').format('YYYY-MM-DD'),
            'endtime': moment().format('YYYY-MM-DD'),
            'dateEnabled': false,
            'locationEnabled': false
        }
    }

    static navigationOptions = {
        headerStyle: styles.headerStyle,
        headerTitleStyle: styles.headerTitleStyle
    }

    render() {
        return(
            <View style={styles.settingsView}>

                <SettingsSlider
                    label="Minimum Magnitude"
                    minimumValue={1}
                    maximumValue={9}
                    step={0.5}
                    onValueChange={(value) => {
                        this.setState({ 'minmagnitude': value });
                    }} />

                <View style={styles.settingsItem}>
                    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                        Number of Earthquakes
                    </Text>

                    <Picker
                        style={{ flex: 1, alignSelf: 'center' }}
                        selectedValue={this.state.limit}
                        onValueChange={(value) => {
                            this.setState({ 'limit': value });
                        }}>

                        <Picker.Item label='All' value={null} />
                        <Picker.Item label='10' value={10} />
                        <Picker.Item label='50' value={50} />
                        <Picker.Item label='100' value={100} />
                        <Picker.Item label='500' value={500} />

                    </Picker>
                </View>

                <SettingsSwitch
                    label="Set Date Range"
                    value={this.state.dateEnabled}
                    onValueChange={(value) => {
                        this.setState({ 'dateEnabled': value });
                    }} />

                <SettingsDatePicker
                    label="Start Time"
                    date={this.state.starttime}
                    subItem={true}
                    enabled={this.state.dateEnabled}
                    onValueChange={(value) => {
                        this.setState({ 'starttime': value });
                    }} />

                <SettingsDatePicker
                    label="End Time"
                    date={this.state.endtime}
                    subItem={true}
                    enabled={this.state.dateEnabled}
                    onValueChange={(value) => {
                        this.setState({ 'endtime': value });
                    }} />

                <SettingsSwitch
                    label="Set Area"
                    value={this.state.locationEnabled}
                    onValueChange={(value) => {
                        this.setState({ 'locationEnabled': value });
                    }} />


                <View style={[styles.settingsItem, {
                    paddingLeft: 20,
                    opacity: this.state.locationEnabled ? 1 : 0.5
                }]}>

                    <Text style={styles.settingsItemLabel}>
                        Radius (km)
                    </Text>

                    <Picker
                        selectedValue={this.state.maxradiuskm}
                        enabled={this.state.locationEnabled}
                        onValueChange={(value) => {
                            this.setState({ 'maxradiuskm': value });
                        }}
                        style={{flex: 1, alignSelf: 'center' }}>

                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='10' value={10} />
                        <Picker.Item label='50' value={50} />
                        <Picker.Item label='100' value={100} />
                        <Picker.Item label='500' value={500} />
                        <Picker.Item label='1000' value={1000} />
                        <Picker.Item label='5000' value={5000} />

                    </Picker>
                </View>

                <View style={styles.settingsItem}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Reset"
                            color="red"
                            onPress={() => {
                                this.setState({ type: 'feed' });
                            }} />
                    </View>

                    <View style={{flex: 1}}>
                        <Button
                            title="Save and Close"
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
