import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import styles from '../config/styles';

class SettingsDatePicker extends Component {
    render() {
        return(
            <View style={[styles.settingsItem, {
                paddingLeft: this.props.subItem ? 20 : 0,
                opacity: this.props.enabled ? 1 : 0.5
            }]}>
                <Text style={[styles.settingsItemLabel, {
                    fontWeight: this.props.subItem ? 'normal' : 'bold'
                }]}>
                    {this.props.label}
                </Text>

                <DatePicker
                    style={{ width: 200, alignSelf: 'center' }}
                    date={this.props.date}
                    disabled={!this.props.enabled}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate={moment().format('YYYY-MM-DD')}
                    confirmBtnText="Select"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={this.props.onValueChange}
                />
            </View>
        )
    }
}

export default SettingsDatePicker;
