import dayjs from 'dayjs';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingsDatePicker = ({ date, disabled, onValueChange }) => {
  const onChange = (_, value) => disabled || onValueChange(dayjs(value));
  return (
    <DateTimePicker
      value={date.toDate()}
      mode="date"
      is24Hour={false}
      display="default"
      minimumDate={dayjs('1900-01-01').toDate()}
      onChange={onChange}
    />
  );
};

export default SettingsDatePicker;
