import React from 'react';
import moment from 'moment';

import DatePicker from 'react-native-datepicker';
import SettingsItem from './SettingsItem';
import SettingsItemLabel from './SettingsItemLabel';

const SettingsDatePicker = ({ date, disabled, label, onValueChange }) => (
  <SettingsItem subItem disabled={disabled}>
    <SettingsItemLabel subItem>{label}</SettingsItemLabel>

    <DatePicker
      style={styles.datePicker}
      date={date}
      disabled={disabled}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="1900-01-01"
      maxDate={moment().format('YYYY-MM-DD')}
      confirmBtnText="Select"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: styles.dateIcon,
        dateInput: styles.dateInput
      }}
      onDateChange={onValueChange}
    />
  </SettingsItem>
);

const styles = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 36
  },
  datePicker: {
    width: 200,
    alignSelf: 'center'
  }
};

export default SettingsDatePicker;
