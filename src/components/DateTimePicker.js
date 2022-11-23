import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Text, TouchableRipple } from 'react-native-paper';
import {
  DATE_FORMAT,
  TIMESTAMP_FORMAT,
  TIME_FORMAT,
} from '../config/constants';

const DateTimePicker = ({ disabled, onChange, value }) => {
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const onValueChange = useCallback(
    (event, selectedValue) => {
      if (event.type === 'dismissed') {
        setMode(null);
        setDate(null);
        setTime(null);
      } else if (event.type === 'set') {
        if (mode === 'date') {
          setDate(dayjs(selectedValue).format(DATE_FORMAT));
          setMode('time');
        } else if (mode === 'time') {
          setTime(dayjs(selectedValue).format(TIME_FORMAT));
          setMode(null);
        }
      }
    },
    [mode],
  );
  useEffect(() => {
    if (date && time) {
      onChange(dayjs(`${date} ${time}`).toDate());
      setDate(null);
      setTime(null);
    }
  }, [date, onChange, time]);
  return (
    <>
      <TouchableRipple
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        disabled={disabled}
        onPress={() => setMode('date')}
      >
        <Text>{dayjs(value).format(TIMESTAMP_FORMAT)}</Text>
      </TouchableRipple>
      {mode !== null ? (
        <RNDateTimePicker
          mode={mode}
          onChange={onValueChange}
          value={value}
          minimumDate={dayjs('1900-01-01').toDate()}
          maximumDate={dayjs().toDate()}
        />
      ) : null}
    </>
  );
};

export default DateTimePicker;
