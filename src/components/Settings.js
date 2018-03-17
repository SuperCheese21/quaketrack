import React, { Component } from 'react';
import { Button, Picker, Text, View } from 'react-native';

import SettingsDatePicker from './SettingsDatePicker';
import SettingsSwitch from './SettingsSwitch';
import SettingsSlider from './SettingsSlider';

import colors from '../config/colors';
import styles from '../config/styles';

class Settings extends Component {
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
                    }} />

                <View style={styles.settingsItem}>
                    <Text style={[styles.settingsItemLabel, { fontWeight: 'bold' }]}>
                        Number of Earthquakes
                    </Text>

                    <Picker
                        style={{ flex: 1, alignSelf: 'center' }}
                        selectedValue={100}
                        onValueChange={(value) => {
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
                    value={false}
                    onValueChange={(value) => {
                    }} />

                <SettingsDatePicker
                    label="Start Time"
                    date={'2018-01-01'}
                    subItem={true}
                    enabled={false}
                    onValueChange={(value) => {
                    }} />

                <SettingsDatePicker
                    label="End Time"
                    date={'2018-03-17'}
                    subItem={true}
                    enabled={false}
                    onValueChange={(value) => {
                    }} />

                <SettingsSwitch
                    label="Set Area"
                    value={false}
                    onValueChange={(value) => {
                    }} />


                <View style={[styles.settingsItem, {
                    paddingLeft: 20,
                    opacity: 0.5
                }]}>

                    <Text style={styles.settingsItemLabel}>
                        Radius (km)
                    </Text>

                    <Picker
                        selectedValue={5}
                        enabled={false}
                        onValueChange={(value) => {
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
