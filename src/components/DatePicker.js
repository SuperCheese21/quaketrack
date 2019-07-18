import React from 'react';
import { Text, View } from 'react-native';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const SettingsDatePicker = props => (
  <View
    style={[
      styles.settingsItem,
      {
        paddingLeft: props.subItem ? 20 : 0,
        opacity: props.enabled ? 1 : 0.5
      }
    ]}
  >
    <Text
      style={[
        styles.settingsItemLabel,
        {
          fontWeight: props.subItem ? 'normal' : 'bold'
        }
      ]}
    >
      {props.label}
    </Text>

    <DatePicker
      style={{ width: 200, alignSelf: 'center' }}
      date={props.date}
      disabled={!props.enabled}
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
      onDateChange={props.onValueChange}
    />
  </View>
);

export default SettingsDatePicker;
