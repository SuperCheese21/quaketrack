import dayjs from 'dayjs';
import React from 'react';
import DatePicker from 'react-native-datepicker';
import { DATE_FORMAT } from '../config/constants';

const styles = {
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
  },
  datePicker: {
    width: 200,
    alignSelf: 'center',
  },
};

const SettingsDatePicker = ({ date, disabled, onValueChange }) => (
  <DatePicker
    style={styles.datePicker}
    date={date}
    disabled={disabled}
    mode="date"
    placeholder="select date"
    format={DATE_FORMAT}
    minDate="1900-01-01"
    maxDate={dayjs().format(DATE_FORMAT)}
    confirmBtnText="Select"
    cancelBtnText="Cancel"
    customStyles={{
      dateIcon: styles.dateIcon,
      dateInput: styles.dateInput,
    }}
    onDateChange={onValueChange}
  />
);

export default SettingsDatePicker;
